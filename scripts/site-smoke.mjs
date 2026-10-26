import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const pages = ["/", "/services", "/for-sponsors", "/for-sites", "/about", "/contact"];
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.emulateMedia({ reducedMotion: "no-preference" });
const browserErrors = [];
const internalTargets = new Map();
const titles = new Set();
const descriptions = new Set();
let turnstileRecoveryCases = 0;
let unavailableFormCases = 0;
page.on("pageerror", (error) => browserErrors.push(error.message));
await page.route(/^https:\/\/challenges\.cloudflare\.com\/turnstile\/v0\/api\.js/, (route) => route.fulfill({
  status: 200,
  contentType: "application/javascript",
  body: `(() => {
    let nextId = 0;
    const widgets = new Map();
    window.__testTurnstile = { renders: 0, removals: 0 };
    window.turnstile = {
      render(element, options) {
        const id = String(++nextId);
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Verify spam protection";
        button.setAttribute("aria-label", "Verify spam protection");
        button.addEventListener("click", () => options.callback("smoke-token-" + id + "-" + Date.now()));
        element.append(button);
        widgets.set(id, button);
        window.__testTurnstile.renders += 1;
        return id;
      },
      remove(id) {
        widgets.get(id)?.remove();
        widgets.delete(id);
        window.__testTurnstile.removals += 1;
      }
    };
  })();`,
}));

try {
  for (const path of pages) {
    const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200, `${path} should load`);
    assert.equal(await page.locator("h1").count(), 1, `${path} should have one main heading`);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    assert.ok(title, `${path} should have a title`);
    assert.ok(description, `${path} should have a description`);
    titles.add(title);
    descriptions.add(description);
    for (const property of ["og:title", "og:description", "og:image"]) {
      assert.ok(await page.locator(`meta[property="${property}"]`).getAttribute("content"), `${path} should define ${property}`);
    }
    assert.equal(await page.locator('meta[property="og:image"]').getAttribute("content"), `${baseUrl}/og-image.png`, `${path} should use the branded social image`);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), path === "/" ? baseUrl : new URL(path, baseUrl).toString(), `${path} should define its canonical URL`);

    const photos = page.locator("main figure img");
    const hasVisual = path === "/contact"
      ? await page.locator('iframe[title*="Google Maps"]').count() > 0
      : await photos.count() > 0;
    assert.ok(hasVisual, `${path} should contain a relevant visual`);
    for (let index = 0; index < await photos.count(); index += 1) {
      const photo = photos.nth(index);
      const alt = await photo.getAttribute("alt");
      assert.ok(alt?.trim(), `${path} editorial images should have useful alt text`);
      await photo.scrollIntoViewIfNeeded();
      await photo.evaluate((image) => image.decode());
      const dimensions = await photo.evaluate((image) => ({ width: image.naturalWidth, height: image.naturalHeight }));
      assert.ok(dimensions.width > 0 && dimensions.height > 0, `${path} editorial image ${index + 1} should load`);
    }
    await page.evaluate(() => window.scrollTo(0, 0));

    if (path === "/services") {
      const jumpLinks = page.locator('nav[aria-label="Jump to a service"] a');
      assert.equal(await jumpLinks.count(), 4, "the services page should offer a quick link to each service area");
      const feasibilityLink = page.locator('nav[aria-label="Jump to a service"] a[href="#feasibility"]');
      await feasibilityLink.click();
      assert.equal(new URL(page.url()).hash, "#feasibility", "the service index should jump to the selected service");
      assert.ok(await page.locator("#feasibility h2").isVisible(), "the selected service heading should remain visible after the jump");
      await page.evaluate(() => window.scrollTo(0, 0));
    }

    if (path === "/contact") {
      const map = page.getByTitle("Google Maps preview of Boston, Massachusetts, an illustrative location only");
      assert.equal(await map.count(), 1, "the contact page should show one clearly labeled illustrative Google Map");
      assert.match(await map.getAttribute("src"), /maps\.google\.com\/maps\?.*output=embed/, "the contact map should use a Google Maps embed");
      assert.ok(await page.getByText(/Google Maps preview; the location is illustrative only\./).count(), "the map should not imply a real office location");
      assert.ok(await page.getByRole("link", { name: "Start an inquiry" }).count(), "the contact page should offer a prominent link to the form");
    }

    if (path === "/") {
      const video = page.locator("main video");
      assert.equal(await video.count(), 1, "the homepage should have one supplied hero video");
      assert.equal(await video.getAttribute("poster"), "/images/hero-poster.webp", "the hero video should have a still poster");
      const heroLayout = await page.locator("main > section").first().evaluate((section) => {
        const videoElement = section.querySelector("video");
        if (!videoElement) return null;
        const sectionBounds = section.getBoundingClientRect();
        const videoBounds = videoElement.getBoundingClientRect();
        return {
          section: { x: sectionBounds.x, y: sectionBounds.y, width: sectionBounds.width, height: sectionBounds.height },
          video: { x: videoBounds.x, y: videoBounds.y, width: videoBounds.width, height: videoBounds.height },
          opacity: Number(getComputedStyle(videoElement).opacity),
        };
      });
      assert.ok(heroLayout, "the hero should include its background video");
      assert.equal(heroLayout.video.width, heroLayout.section.width, "the hero video should span the section width");
      assert.equal(heroLayout.video.height, heroLayout.section.height, "the hero video should span the section height");
      assert.ok(heroLayout.opacity >= 0.4 && heroLayout.opacity <= 0.5, "the background video should be more visible while staying subdued behind copy");
      const processBackground = await page.locator("#how-it-works").evaluate((section) => {
        const style = getComputedStyle(section);
        return { image: style.backgroundImage, attachment: style.backgroundAttachment };
      });
      assert.match(processBackground.image, /feasibility-review\.webp/, "the process section should have its feasibility photo as a decorative background");
      assert.equal(processBackground.attachment, "fixed", "the process section background should remain pinned while content scrolls");
      assert.equal(await page.getByText("Illustrative image", { exact: true }).count(), 0, "editorial images should not carry redundant visible captions");
      const sectionHeading = page.locator("#services h2");
      await sectionHeading.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => document.querySelector("#services h2")?.getAttribute("data-scroll-reveal") === "revealed");
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForFunction(() => {
        const element = document.querySelector("main video");
        return Boolean(element && element.currentTime > 0 && !element.paused);
      }, null, { timeout: 10000 });
      await page.getByRole("button", { name: "Pause background video" }).click();
      await page.waitForFunction(() => document.querySelector("main video")?.paused);
      await page.getByRole("button", { name: "Play background video" }).click();
      await page.waitForFunction(() => {
        const element = document.querySelector("main video");
        return Boolean(element && element.currentTime > 0 && !element.paused);
      }, null, { timeout: 10000 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForFunction(() => {
        const element = document.querySelector("main video");
        return Boolean(element && element.paused && !element.hasAttribute("src"));
      });
      await page.waitForFunction(() => document.querySelector("#how-it-works h2")?.getAttribute("data-scroll-reveal") === "reduced");
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.waitForFunction(() => {
        const element = document.querySelector("main video");
        return Boolean(element && element.currentTime > 0 && !element.paused);
      }, null, { timeout: 10000 });
    }

    const hrefs = await page.locator("a[href]").evaluateAll((anchors) => anchors.map((anchor) => anchor.href));
    for (const href of hrefs) {
      const link = new URL(href);
      if (link.origin === new URL(baseUrl).origin) internalTargets.set(link.href, link);
    }

    for (const width of [390, 768]) {
      await page.setViewportSize({ width, height: 844 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      assert.equal(overflow, false, `${path} should not overflow at ${width}px`);
    }
    await page.setViewportSize({ width: 1440, height: 900 });
  }
  assert.equal(titles.size, pages.length, "each primary page should have a unique title");
  assert.equal(descriptions.size, pages.length, "each primary page should have a unique description");

  for (const link of internalTargets.values()) {
    const response = await page.request.get(`${link.origin}${link.pathname}${link.search}`);
    assert.equal(response.status(), 200, `internal link should load: ${link.pathname}${link.search}`);
    if (link.hash) {
      await page.goto(`${link.origin}${link.pathname}${link.search}`, { waitUntil: "networkidle" });
      assert.ok(await page.locator(link.hash).count(), `internal anchor should exist: ${link.pathname}${link.hash}`);
    }
  }

  await page.goto(`${baseUrl}/contact?inquiry=sponsor`, { waitUntil: "networkidle" });
  const inquiryType = page.locator("#kind-select");
  if (await page.locator("#inquiry-form [data-inquiry-unavailable]").count()) {
    assert.equal(await page.locator("#inquiry-form form").count(), 0, "Contact should not expose an unusable inquiry type selector");
  } else {
    assert.ok(await inquiryType.isVisible(), "Contact should keep the inquiry type selector available");
    assert.equal(await page.getByLabel("Company").count(), 1, "a sponsor inquiry should show sponsor fields");
    await inquiryType.selectOption("site");
    assert.equal(await page.getByLabel("Organization or site name").count(), 1, "the Contact selector should switch to site fields");
    await inquiryType.selectOption("general");
    assert.equal(await page.getByLabel("Subject").count(), 1, "the Contact selector should switch back to general fields");
  }

  const navLabels = await page.locator('nav[aria-label="Main navigation"] a').allTextContents();
  for (const label of ["Home", "Services", "For Sponsors & CROs", "For Sites", "About", "Contact"]) {
    assert.ok(navLabels.some((item) => item.trim() === label), `desktop navigation should contain ${label}`);
  }

  const invalidRoute = await page.request.get(`${baseUrl}/this-page-does-not-exist`);
  assert.equal(invalidRoute.status(), 404, "unknown pages should return 404");
  const oldCareersRoute = await page.request.get(`${baseUrl}/careers`);
  assert.equal(oldCareersRoute.status(), 404, "unlisted Careers route should return 404");

  const sitemapResponse = await page.request.get(`${baseUrl}/sitemap.xml`);
  assert.equal(sitemapResponse.status(), 200, "sitemap should load");
  const sitemap = await sitemapResponse.text();
  for (const path of pages) assert.ok(sitemap.includes(`${path === "/" ? baseUrl : new URL(path, baseUrl).toString()}</loc>`), `sitemap should include ${path}`);
  assert.ok(!sitemap.includes("/careers"), "sitemap should not list Careers");

  const robots = await page.request.get(`${baseUrl}/robots.txt`);
  assert.equal(robots.status(), 200, "robots.txt should load");
  assert.ok((await robots.text()).includes("sitemap.xml"), "robots.txt should point to the sitemap");
  for (const asset of ["/og-image.png", "/icon.svg", "/favicon.ico"]) {
    const response = await page.request.get(`${baseUrl}${asset}`);
    assert.equal(response.status(), 200, `${asset} should load`);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  const menuButton = page.getByRole("button", { name: "Open navigation menu" });
  await menuButton.click();
  assert.equal(await page.getByRole("button", { name: "Close navigation menu" }).getAttribute("aria-expanded"), "true", "mobile menu should open accessibly");
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("button", { name: "Open navigation menu" }).getAttribute("aria-expanded"), "false", "Escape should close the mobile menu");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page.locator("#mobile-navigation").getByRole("link", { name: "Services", exact: true }).click();
  await page.waitForURL((url) => url.pathname === "/services");
  assert.ok(page.url().endsWith("/services"), "mobile navigation should open the selected route");
  assert.equal(await page.getByRole("button", { name: "Open navigation menu" }).getAttribute("aria-expanded"), "false", "mobile navigation should close after route selection");

  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  const processCards = page.locator("#how-it-works [data-parallax-card]");
  for (let index = 0; index < await processCards.count(); index += 1) {
    await processCards.nth(index).scrollIntoViewIfNeeded();
    await page.waitForFunction((cardIndex) => {
      const card = document.querySelectorAll("#how-it-works [data-parallax-card]")[cardIndex];
      return card?.dataset.scrollReveal === "revealed" && getComputedStyle(card).opacity === "1";
    }, index);
  }
  const contrast = await page.evaluate(() => {
    const parse = (value) => {
      const numbers = value.match(/-?(?:\d+\.?\d*|\.\d+)/g)?.map(Number) ?? [];
      if (value.startsWith("oklab(") && numbers.length >= 3) {
        const [lightness, a, b] = numbers;
        const alpha = numbers[3] ?? 1;
        const lRoot = lightness + 0.3963377774 * a + 0.2158037573 * b;
        const mRoot = lightness - 0.1055613458 * a - 0.0638541728 * b;
        const sRoot = lightness - 0.0894841775 * a - 1.291485548 * b;
        const l = lRoot ** 3;
        const m = mRoot ** 3;
        const s = sRoot ** 3;
        const linear = [
          4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
          -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
          -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
        ];
        const srgb = linear.map((channel) => 255 * (channel <= 0.0031308 ? 12.92 * channel : 1.055 * Math.max(0, channel) ** (1 / 2.4) - 0.055));
        return [...srgb, alpha];
      }
      return [numbers[0] ?? 0, numbers[1] ?? 0, numbers[2] ?? 0, numbers[3] ?? 1];
    };
    const blend = (front, back) => {
      const alpha = front[3];
      return [0, 1, 2].map((index) => front[index] * alpha + back[index] * (1 - alpha));
    };
    const luminance = (rgb) => {
      const channels = rgb.map((value) => {
        const normalized = value / 255;
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    };
    const failures = [];
    const candidates = document.querySelectorAll("h1,h2,h3,p,a,button,label,span,small,li");
    for (const element of candidates) {
      if (!Array.from(element.childNodes).some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim())) continue;
      const style = getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden") continue;
      let background = [255, 255, 255];
      let opacity = 1;
      const ancestry = [];
      for (let current = element; current; current = current.parentElement) ancestry.push(current);
      for (const current of ancestry.reverse()) {
        const currentStyle = getComputedStyle(current);
        const color = parse(currentStyle.backgroundColor);
        if (color[3] > 0) background = blend(color, background);
        opacity *= Number(currentStyle.opacity || 1);
      }
      const foreground = parse(style.color);
      foreground[3] *= opacity;
      const visibleForeground = blend(foreground, background);
      const values = [luminance(visibleForeground), luminance(background)].sort((a, b) => b - a);
      const ratio = (values[0] + 0.05) / (values[1] + 0.05);
      const largeText = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && Number(style.fontWeight) >= 700);
      if (ratio < (largeText ? 3 : 4.5)) failures.push({ text: element.textContent.trim().slice(0, 60), ratio: Number(ratio.toFixed(2)), color: style.color, background: `rgb(${background.join(",")})` });
    }
    return failures;
  });
  assert.deepEqual(contrast, [], `homepage text should meet WCAG AA contrast: ${JSON.stringify(contrast)}`);

  const formCases = [
    {
      kind: "general",
      path: "/contact?inquiry=general",
      values: { "Full name": "Sample Contact", "Work email": "contact@example.test", Organization: "Example Research", Subject: "General inquiry", Message: "A non-confidential message for a form smoke check." },
    },
    {
      kind: "sponsor",
      path: "/for-sponsors",
      values: { Name: "Sample Sponsor Contact", "Business email": "sponsor@example.test", Company: "Example Biotech", "Job title": "Study lead", "Study or therapeutic area": "Oncology", "Target geography": "Northeast United States", "Brief description of requirements": "A high-level study feasibility request for a form smoke check." },
    },
    {
      kind: "site",
      path: "/for-sites",
      values: { "Organization or site name": "Example Research Site", "Location and service area": "Albany, New York", "Principal investigator name": "Dr. Sample Investigator", "Professional contact email": "site@example.test", "Therapeutic areas": "Oncology", "Facilities and operational capabilities": "Dedicated research rooms and study staff." },
    },
  ];

  for (const formCase of formCases) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}${formCase.path}`, { waitUntil: "networkidle" });
    if (await page.locator("#inquiry-form [data-inquiry-unavailable]").count()) {
      unavailableFormCases += 1;
      assert.equal(await page.locator("#inquiry-form form").count(), 0, `${formCase.kind} should not expose fields when delivery is unavailable`);
      assert.equal(await page.locator('#inquiry-form button[type="submit"]').count(), 0, `${formCase.kind} should not invite an undeliverable submission`);
      assert.ok(await page.getByText(/submissions cannot be sent/i).count(), `${formCase.kind} should explain why the form is unavailable`);
      continue;
    }

    const submit = page.locator('#inquiry-form button[type="submit"]');
    const privacyLink = page.locator('#inquiry-form label[for="consent"] a');
    if (await privacyLink.count()) {
      const href = await privacyLink.getAttribute("href");
      assert.ok(href?.startsWith("https://"), `${formCase.kind} consent should link to a secure final privacy notice`);
      assert.notEqual(href, "/privacy-policy", `${formCase.kind} consent must not fall back to the draft privacy page`);
    } else {
      assert.ok(await page.getByText(/final privacy notice is not published yet/i).count(), `${formCase.kind} should explain when no final privacy notice is configured`);
    }
    await submit.click();
    assert.ok(await page.locator('#inquiry-form [role="alert"]').count(), `${formCase.kind} form should show required-field errors`);

    for (const [label, value] of Object.entries(formCase.values)) await page.getByLabel(label).fill(value);
    await page.getByLabel(Object.keys(formCase.values).find((name) => name.toLowerCase().includes("email"))).fill("not-an-email");
    await submit.click();
    assert.ok((await page.locator('#inquiry-form [role="alert"]').allTextContents()).some((text) => text.includes("valid business email")), `${formCase.kind} form should reject invalid email`);
    const emailLabel = Object.keys(formCase.values).find((name) => name.toLowerCase().includes("email"));
    await page.getByLabel(emailLabel).fill(formCase.values[emailLabel]);
    await page.locator("#consent").check();

    const challenge = page.locator('#inquiry-form [aria-label="Spam protection verification"] button');
    if (await challenge.count()) {
      turnstileRecoveryCases += 1;
      const beforeFailure = await page.evaluate(() => window.__testTurnstile.renders);
      await challenge.click();
      await page.route("**/api/inquiry", (route) => route.fulfill({ status: 502, contentType: "application/json", body: JSON.stringify({ error: "Mocked email delivery failure." }) }));
      await submit.click();
      await page.getByText("Mocked email delivery failure.").waitFor();
      await page.unroute("**/api/inquiry");
      await page.waitForFunction((previous) => window.__testTurnstile.renders > previous, beforeFailure);
      const beforeSuccess = await page.evaluate(() => window.__testTurnstile.renders);
      assert.ok(beforeSuccess > beforeFailure, `${formCase.kind} should render a fresh Turnstile widget after a failed attempt`);
      await page.locator('#inquiry-form [aria-label="Spam protection verification"] button').click();

      await page.route("**/api/inquiry", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ message: "Local smoke test: mocked success state." }) }));
      await submit.click();
      await page.getByText("Inquiry received", { exact: true }).waitFor();
      await page.unroute("**/api/inquiry");
      const beforeAnother = await page.evaluate(() => window.__testTurnstile.renders);
      await page.getByRole("button", { name: "Send another inquiry" }).click();
      await page.waitForFunction((previous) => window.__testTurnstile.renders > previous, beforeAnother);
      assert.equal(await page.locator('#inquiry-form [aria-label="Spam protection verification"] button').count(), 1, `${formCase.kind} should render a fresh Turnstile widget for another inquiry`);
    } else {
      await submit.click();
      await page.getByText("Your inquiry has not been sent or stored.").waitFor();
      assert.ok((await page.locator('#inquiry-form [role="alert"]').allTextContents()).some((text) => text.includes("not been sent or stored")), `${formCase.kind} should report that delivery is not configured`);

      await page.route("**/api/inquiry", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ message: "Local smoke test: mocked success state." }) }));
      await submit.click();
      await page.getByText("Inquiry received", { exact: true }).waitFor();
      assert.ok(await page.getByText("Inquiry received", { exact: true }).isVisible(), `${formCase.kind} should show the success state after a successful response`);
      await page.unroute("**/api/inquiry");
    }
  }
  if (process.env.EXPECT_TURNSTILE === "true" && unavailableFormCases === 0) {
    assert.equal(turnstileRecoveryCases, formCases.length, "configured delivery should exercise Turnstile recovery for all three inquiry forms");
  }

  const unknownPage = await page.goto(`${baseUrl}/this-page-does-not-exist`, { waitUntil: "networkidle" });
  assert.equal(unknownPage?.status(), 404, "custom not-found page should return a 404 status");
  assert.match(await page.locator("h1").innerText(), /isn’t in sync/i, "custom 404 should use the branded message");

  await mkdir("test-results/final-smoke", { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.screenshot({ path: "test-results/final-smoke/site-desktop-home.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "test-results/final-smoke/site-mobile-home.png", fullPage: true });

  assert.deepEqual(browserErrors, [], `browser should have no JavaScript errors: ${JSON.stringify(browserErrors)}`);
  console.log(`Site smoke checks passed for ${pages.length} pages, editorial image loading, hero video controls and reduced-motion behavior, two responsive widths, mobile navigation and inquiry switching, ${unavailableFormCases ? `${unavailableFormCases} unavailable forms correctly hidden` : `${turnstileRecoveryCases} Turnstile recovery paths`}, SEO assets, privacy notice gating, 404 behavior, contrast, and inquiry form states.`);
} finally {
  await browser.close();
}
