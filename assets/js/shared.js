(function () {
  if (!window.__gbInspectGuard) {
    window.__gbInspectGuard = true;
    document.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    }, true);
    document.addEventListener("keydown", function (event) {
      var key = String(event.key || "").toUpperCase();
      var modifier = event.ctrlKey || event.metaKey;
      var blocked =
        key === "F12" ||
        (modifier && event.shiftKey && ["I", "J", "C", "K"].indexOf(key) !== -1) ||
        (modifier && ["U"].indexOf(key) !== -1);
      if (!blocked) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function swapClasses(el, remove, add) {
    if (!el) return;
    remove.forEach(function (name) { el.classList.remove(name); });
    add.forEach(function (name) { el.classList.add(name); });
  }

  ready(function () {
    var tabletHeaderFix = document.createElement("style");
    tabletHeaderFix.textContent = [
      "html, body { overflow-x: hidden; }",
      "body { background: #0d0d0d; }",
      "#root { max-width: min(100%, var(--gb-container-max, 1720px)); margin: 0 auto; overflow-x: visible; background: #0d0d0d; }",
      "#root { padding-top: var(--gb-fixed-public-nav-height, 120px); }",
      "#root > .sticky.top-0.z-50 {",
      "  position: fixed !important;",
      "  top: 0 !important;",
      "  left: 0 !important;",
      "  right: 0 !important;",
      "  z-index: 9999 !important;",
      "  width: 100vw !important;",
      "  max-width: none !important;",
      "  margin: 0 !important;",
      "  transform: translateZ(0);",
      "}",
      "#root > .sticky.top-0.z-50 header {",
      "  width: min(100%, var(--gb-container-max, 1720px)) !important;",
      "  margin-left: auto !important;",
      "  margin-right: auto !important;",
      "  box-shadow: 0 10px 34px rgba(0, 0, 0, 0.34);",
      "}",
      "#root > .sticky.top-0.z-50 > div {",
      "  width: 100%;",
      "}",
      "@media (min-width: 1280px) {",
      "  #root .max-w-7xl { max-width: var(--gb-container-max, 1600px) !important; }",
      "}",
      "@media (min-width: 768px) and (max-width: 1023px) {",
      "  header button[aria-label='Toggle menu'] { display: flex !important; }",
      "  header nav.hidden.md\\:flex { display: none !important; }",
      "  header > div > a.hidden.md\\:flex { display: none !important; }",
      "  header > div { gap: 1rem !important; }",
      "  header > div > a:first-child { margin-right: auto; }",
      "  header > .md\\:hidden.overflow-hidden.transition-all { display: block !important; }",
      "}",
      "@media (max-width: 767px) {",
      "  #root { padding-top: var(--gb-fixed-public-nav-height, 112px); }",
      "  #root > .sticky.top-0.z-50 header > div:first-child { height: 68px !important; }",
      "  #root > .sticky.top-0.z-50 header nav { max-height: calc(100dvh - 68px); }",
      "}",
      "img[src*='kwik-ecabs-logo'] {",
      "  mix-blend-mode: screen;",
      "  background: transparent !important;",
      "}"
    ].join("\n");
    document.head.appendChild(tabletHeaderFix);

    var footerStyle = document.createElement("style");
    footerStyle.textContent = [
      "footer.gb-pro-footer {",
      "  position: relative;",
      "  overflow: hidden;",
      "  isolation: isolate;",
      "  left: auto;",
      "  width: min(100%, var(--gb-container-max, 1720px));",
      "  margin-left: auto;",
      "  margin-right: auto;",
      "  color: #f8fafc !important;",
      "  background: linear-gradient(135deg, rgba(227, 32, 40, 0.16) 0%, rgba(227, 32, 40, 0) 34%), linear-gradient(180deg, #080808 0%, #111111 58%, #090909 100%) !important;",
      "  border-top: 1px solid rgba(255, 255, 255, 0.09) !important;",
      "  text-align: left !important;",
      "}",
      "footer.gb-pro-footer::before {",
      "  content: '';",
      "  position: absolute;",
      "  inset: 0 0 auto;",
      "  height: 1px;",
      "  background: linear-gradient(90deg, transparent, rgba(227, 32, 40, 0.9), transparent);",
      "}",
      "footer.gb-pro-footer::after {",
      "  content: '';",
      "  position: absolute;",
      "  right: -10rem;",
      "  top: 5rem;",
      "  z-index: -1;",
      "  width: 28rem;",
      "  height: 28rem;",
      "  background: radial-gradient(circle, rgba(227, 32, 40, 0.16), transparent 68%);",
      "  pointer-events: none;",
      "}",
      "footer.gb-pro-footer > div:first-child {",
      "  padding-top: 4.5rem !important;",
      "  padding-bottom: 1.1rem !important;",
      "}",
      "footer.gb-pro-footer > div:first-child > div:first-child {",
      "  grid-template-columns: minmax(260px, 1.1fr) minmax(260px, 1.1fr) minmax(180px, 0.75fr) minmax(230px, 0.9fr) !important;",
      "  gap: 2rem !important;",
      "  align-items: start !important;",
      "  text-align: left !important;",
      "}",
      "footer.gb-pro-footer > div:first-child > div:first-child > div {",
      "  align-items: flex-start !important;",
      "  text-align: left !important;",
      "}",
      "footer.gb-pro-footer > div:first-child > div:first-child p,",
      "footer.gb-pro-footer > div:first-child > div:first-child address,",
      "footer.gb-pro-footer > div:first-child > div:first-child h3,",
      "footer.gb-pro-footer > div:first-child > div:first-child a {",
      "  text-align: left !important;",
      "}",
      "footer.gb-pro-footer > div:first-child > div:first-child > div:first-child {",
      "  min-height: 100%;",
      "  padding: 1.4rem !important;",
      "  border-radius: 8px;",
      "  background: linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018));",
      "  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.25);",
      "  align-items: flex-start !important;",
      "}",
      "footer.gb-pro-footer img[alt='GoBright'] {",
      "  height: 4.75rem !important;",
      "}",
      "footer.gb-pro-footer p, footer.gb-pro-footer address {",
      "  color: #b7c0cc !important;",
      "}",
      "footer.gb-pro-footer > div:first-child > div:first-child > div:nth-child(2) > div {",
      "  padding: 0.5rem 0 !important;",
      "  border-bottom: 1px solid rgba(255, 255, 255, 0.09);",
      "  justify-content: flex-start !important;",
      "  text-align: left !important;",
      "}",
      "footer.gb-pro-footer > div:first-child > div:first-child > div:nth-child(2) > div:first-child {",
      "  padding-top: 0.35rem !important;",
      "}",
      "footer.gb-pro-footer > div:first-child > div:first-child > div:nth-child(2) > div > span:first-child {",
      "  width: 2.55rem !important;",
      "  height: 2.55rem !important;",
      "  border: 1px solid rgba(227, 32, 40, 0.45) !important;",
      "  background: rgba(227, 32, 40, 0.13);",
      "  color: #ffffff !important;",
      "}",
      "footer.gb-pro-footer .gb-support-column {",
      "  padding-top: 0 !important;",
      "  gap: 0.6rem !important;",
      "  align-items: flex-start !important;",
      "  text-align: left !important;",
      "}",
      "footer.gb-pro-footer .gb-support-heading {",
      "  margin-bottom: 0 !important;",
      "}",
      "footer.gb-pro-footer .gb-brand-column .gb-social-block {",
      "  width: 100%;",
      "  margin-top: 0.35rem !important;",
      "  padding: 0 !important;",
      "  border: 0 !important;",
      "  border-radius: 0;",
      "  background: transparent !important;",
      "  text-align: left !important;",
      "}",
      "footer.gb-pro-footer .gb-social-block > div {",
      "  justify-content: flex-start !important;",
      "}",
      "footer.gb-pro-footer .gb-social-label {",
      "  margin-bottom: 0.75rem !important;",
      "  color: #e32028 !important;",
      "  font-weight: 700 !important;",
      "}",
      "footer.gb-pro-footer h3 {",
      "  position: relative;",
      "  padding-bottom: 0.8rem !important;",
      "  border-bottom: 0 !important;",
      "  color: #ffffff !important;",
      "  font-size: 0.78rem !important;",
      "  letter-spacing: 0.12em !important;",
      "}",
      "footer.gb-pro-footer h3::after {",
      "  content: '';",
      "  position: absolute;",
      "  left: 0;",
      "  bottom: 0;",
      "  width: 3rem;",
      "  height: 2px;",
      "  border-radius: 999px;",
      "  background: #e32028;",
      "  transform: none;",
      "}",
      "footer.gb-pro-footer a {",
      "  transition: color 0.2s ease, transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease !important;",
      "}",
      "footer.gb-pro-footer > div:first-child > div:first-child > div:nth-child(n+3) a {",
      "  display: inline-flex !important;",
      "  width: fit-content;",
      "  justify-content: flex-start !important;",
      "  color: #cbd5e1 !important;",
      "  font-weight: 500 !important;",
      "  line-height: 1.45 !important;",
      "}",
      "footer.gb-pro-footer > div:first-child > div:first-child > div:nth-child(n+3) a:hover {",
      "  color: #ffffff !important;",
      "  transform: translateX(4px);",
      "}",
      "footer.gb-pro-footer .gb-quick-links-column {",
      "  gap: 0.55rem !important;",
      "  align-items: flex-start !important;",
      "  text-align: left !important;",
      "}",
      "footer.gb-pro-footer .gb-quick-links-column > div {",
      "  margin-top: 0 !important;",
      "  gap: 0.55rem !important;",
      "  align-items: flex-start !important;",
      "}",
      "footer.gb-pro-footer .gb-quick-links-column a {",
      "  color: #ffffff !important;",
      "  font-size: 1rem !important;",
      "  font-weight: 700 !important;",
      "  line-height: 1.35 !important;",
      "}",
      "footer.gb-pro-footer .gb-quick-links-column a:hover {",
      "  color: #e32028 !important;",
      "}",
      "footer.gb-pro-footer a[href^='tel:'], footer.gb-pro-footer a[href^='mailto:'] {",
      "  color: #d7dee8 !important;",
      "}",
      "footer.gb-pro-footer a[href^='tel:']:hover, footer.gb-pro-footer a[href^='mailto:']:hover {",
      "  color: #ffffff !important;",
      "}",
      "footer.gb-pro-footer .gb-map-address-link {",
      "  display: inline-flex !important;",
      "  width: fit-content;",
      "  margin-left: 0 !important;",
      "  margin-right: 0 !important;",
      "  text-align: left !important;",
      "  color: inherit !important;",
      "  text-decoration: none !important;",
      "  cursor: pointer;",
      "}",
      "footer.gb-pro-footer .gb-map-address-link address {",
      "  transition: color 0.2s ease, transform 0.2s ease !important;",
      "}",
      "footer.gb-pro-footer .gb-map-address-link:hover address {",
      "  color: #ffffff !important;",
      "  transform: translateX(4px);",
      "}",
      "footer.gb-pro-footer a[aria-label]:not([aria-label='Admin']) {",
      "  width: 2.35rem !important;",
      "  height: 2.35rem !important;",
      "  color: #ffffff !important;",
      "  border: 0 !important;",
      "  background: transparent !important;",
      "}",
      "footer.gb-pro-footer a[aria-label]:not([aria-label='Admin']):hover {",
      "  border-color: transparent !important;",
      "  background: transparent !important;",
      "  color: #e32028 !important;",
      "  transform: translateY(-2px);",
      "}",
      "footer.gb-pro-footer > div:last-child {",
      "  margin-top: 0 !important;",
      "  border-top: 1px solid rgba(255, 255, 255, 0.09) !important;",
      "  background: rgba(0, 0, 0, 0.24);",
      "}",
      "footer.gb-pro-footer > div:last-child > div {",
      "  padding-top: 0.7rem !important;",
      "  padding-bottom: 0.7rem !important;",
      "  display: flex !important;",
      "  align-items: center !important;",
      "  justify-content: space-between !important;",
      "  gap: 1rem !important;",
      "  text-align: left !important;",
      "}",
      "footer.gb-pro-footer > div:last-child > div > div:first-child {",
      "  margin-right: auto !important;",
      "  justify-content: flex-start !important;",
      "  text-align: left !important;",
      "}",
      "footer.gb-pro-footer > div:last-child > div > div:first-child p {",
      "  text-align: left !important;",
      "}",
      "footer.gb-pro-footer > div:last-child > div > div:last-child {",
      "  margin-left: auto !important;",
      "  justify-content: flex-end !important;",
      "  text-align: right !important;",
      "  flex-wrap: wrap !important;",
      "}",
      "footer.gb-pro-footer > div:last-child a:not([aria-label='Admin']) {",
      "  color: #9aa6b5 !important;",
      "}",
      "footer.gb-pro-footer > div:last-child a:not([aria-label='Admin']):hover {",
      "  color: #ffffff !important;",
      "}",
      "@media (max-width: 1100px) {",
      "  footer.gb-pro-footer > div:first-child > div:first-child {",
      "    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;",
      "  }",
      "}",
      "@media (min-width: 721px) and (max-width: 1919px) {",
      "  footer.gb-pro-footer, footer.gb-pro-footer > div:first-child > div:first-child > div {",
      "    text-align: left !important;",
      "  }",
      "  footer.gb-pro-footer > div:first-child > div:first-child > div,",
      "  footer.gb-pro-footer .gb-support-column,",
      "  footer.gb-pro-footer .gb-quick-links-column,",
      "  footer.gb-pro-footer .gb-quick-links-column > div {",
      "    align-items: flex-start !important;",
      "  }",
      "  footer.gb-pro-footer > div:first-child > div:first-child > div:nth-child(2) > div,",
      "  footer.gb-pro-footer .gb-social-block > div,",
      "  footer.gb-pro-footer > div:first-child > div:first-child > div:nth-child(n+3) a {",
      "    justify-content: flex-start !important;",
      "  }",
      "  footer.gb-pro-footer .gb-brand-column .gb-social-block,",
      "  footer.gb-pro-footer .gb-map-address-link {",
      "    text-align: left !important;",
      "  }",
      "  footer.gb-pro-footer .gb-map-address-link {",
      "    margin-left: 0 !important;",
      "    margin-right: 0 !important;",
      "  }",
      "  footer.gb-pro-footer h3::after {",
      "    left: 0;",
      "    right: auto;",
      "    transform: none;",
      "  }",
      "  footer.gb-pro-footer > div:last-child > div {",
      "    justify-content: space-between !important;",
      "    text-align: left !important;",
      "  }",
      "  footer.gb-pro-footer > div:last-child > div > div:first-child {",
      "    margin-right: auto !important;",
      "    justify-content: flex-start !important;",
      "    text-align: left !important;",
      "  }",
      "  footer.gb-pro-footer > div:last-child > div > div:last-child {",
      "    margin-left: auto !important;",
      "    justify-content: flex-end !important;",
      "    text-align: right !important;",
      "  }",
      "}",
      "@media (min-width: 1920px) {",
      "  footer.gb-pro-footer {",
      "    left: auto !important;",
      "    width: min(100%, var(--gb-container-max, 1720px)) !important;",
      "    margin-left: auto !important;",
      "    margin-right: auto !important;",
      "  }",
      "  footer.gb-pro-footer, footer.gb-pro-footer > div:first-child > div:first-child > div {",
      "    text-align: left !important;",
      "  }",
      "  footer.gb-pro-footer > div:first-child > div:first-child > div,",
      "  footer.gb-pro-footer .gb-support-column,",
      "  footer.gb-pro-footer .gb-quick-links-column,",
      "  footer.gb-pro-footer .gb-quick-links-column > div {",
      "    align-items: flex-start !important;",
      "  }",
      "  footer.gb-pro-footer > div:first-child > div:first-child > div:nth-child(2) > div,",
      "  footer.gb-pro-footer .gb-social-block > div,",
      "  footer.gb-pro-footer > div:first-child > div:first-child > div:nth-child(n+3) a {",
      "    justify-content: flex-start !important;",
      "  }",
      "  footer.gb-pro-footer .gb-brand-column .gb-social-block,",
      "  footer.gb-pro-footer .gb-map-address-link {",
      "    text-align: left !important;",
      "  }",
      "  footer.gb-pro-footer .gb-map-address-link {",
      "    margin-left: 0 !important;",
      "    margin-right: 0 !important;",
      "  }",
      "  footer.gb-pro-footer h3::after {",
      "    left: 0;",
      "    transform: none;",
      "  }",
      "}",
      "@media (max-width: 720px) {",
      "  footer.gb-pro-footer > div:first-child {",
      "    padding-top: 3rem !important;",
      "    padding-bottom: 0.9rem !important;",
      "  }",
      "  footer.gb-pro-footer > div:first-child > div:first-child {",
      "    grid-template-columns: 1fr !important;",
      "    gap: 1.75rem !important;",
      "    text-align: left !important;",
      "  }",
      "  footer.gb-pro-footer, footer.gb-pro-footer > div:first-child > div:first-child > div {",
      "    text-align: left !important;",
      "  }",
      "  footer.gb-pro-footer > div:first-child > div:first-child > div,",
      "  footer.gb-pro-footer .gb-support-column,",
      "  footer.gb-pro-footer .gb-quick-links-column,",
      "  footer.gb-pro-footer .gb-quick-links-column > div {",
      "    align-items: flex-start !important;",
      "  }",
      "  footer.gb-pro-footer > div:first-child > div:first-child > div:nth-child(2) > div,",
      "  footer.gb-pro-footer .gb-social-block > div,",
      "  footer.gb-pro-footer > div:first-child > div:first-child > div:nth-child(n+3) a {",
      "    justify-content: flex-start !important;",
      "  }",
      "  footer.gb-pro-footer > div:first-child > div:first-child > div:first-child {",
      "    padding: 1.2rem !important;",
      "    align-items: flex-start !important;",
      "  }",
      "  footer.gb-pro-footer .gb-brand-column .gb-social-block,",
      "  footer.gb-pro-footer .gb-map-address-link {",
      "    text-align: left !important;",
      "  }",
      "  footer.gb-pro-footer .gb-map-address-link {",
      "    margin-left: 0 !important;",
      "    margin-right: 0 !important;",
      "  }",
      "  footer.gb-pro-footer h3::after {",
      "    left: 0;",
      "    width: 2.6rem;",
      "    transform: none;",
      "  }",
      "  footer.gb-pro-footer > div:last-child > div {",
      "    align-items: stretch !important;",
      "    justify-content: space-between !important;",
      "    text-align: left !important;",
      "  }",
      "  footer.gb-pro-footer > div:last-child > div > div:first-child {",
      "    width: 100% !important;",
      "    margin-left: 0 !important;",
      "    margin-right: 0 !important;",
      "    justify-content: flex-start !important;",
      "    text-align: left !important;",
      "  }",
      "  footer.gb-pro-footer > div:last-child > div > div:last-child {",
      "    width: 100% !important;",
      "    gap: 0.65rem !important;",
      "    margin-left: 0 !important;",
      "    margin-right: 0 !important;",
      "    justify-content: flex-end !important;",
      "    text-align: right !important;",
      "    flex-wrap: wrap !important;",
      "  }",
      "  #root footer.gb-pro-footer .gb-brand-column .gb-social-block {",
      "    padding: 0 !important;",
      "  }",
      "  #root footer.gb-pro-footer,",
      "  #root footer.gb-pro-footer > div:first-child > div:first-child,",
      "  #root footer.gb-pro-footer > div:first-child > div:first-child > div,",
      "  #root footer.gb-pro-footer > div:first-child > div:first-child p,",
      "  #root footer.gb-pro-footer > div:first-child > div:first-child address,",
      "  #root footer.gb-pro-footer > div:first-child > div:first-child h3,",
      "  #root footer.gb-pro-footer > div:first-child > div:first-child a,",
      "  #root footer.gb-pro-footer .gb-brand-column .gb-social-block,",
      "  #root footer.gb-pro-footer .gb-map-address-link {",
      "    text-align: center !important;",
      "  }",
      "  #root footer.gb-pro-footer > div:first-child > div:first-child > div,",
      "  #root footer.gb-pro-footer .gb-support-column,",
      "  #root footer.gb-pro-footer .gb-quick-links-column,",
      "  #root footer.gb-pro-footer .gb-quick-links-column > div,",
      "  #root footer.gb-pro-footer > div:first-child > div:first-child > div:first-child {",
      "    align-items: center !important;",
      "  }",
      "  #root footer.gb-pro-footer > div:first-child > div:first-child > div:nth-child(2) > div,",
      "  #root footer.gb-pro-footer .gb-social-block > div,",
      "  #root footer.gb-pro-footer > div:first-child > div:first-child > div:nth-child(n+3) a {",
      "    justify-content: center !important;",
      "  }",
      "  #root footer.gb-pro-footer .gb-map-address-link {",
      "    margin-left: auto !important;",
      "    margin-right: auto !important;",
      "  }",
      "  #root footer.gb-pro-footer h3::after {",
      "    left: 50% !important;",
      "    right: auto !important;",
      "    transform: translateX(-50%) !important;",
      "  }",
      "  #root footer.gb-pro-footer > div:last-child > div,",
      "  #root footer.gb-pro-footer > div:last-child > div > div:first-child,",
      "  #root footer.gb-pro-footer > div:last-child > div > div:last-child {",
      "    align-items: center !important;",
      "    justify-content: center !important;",
      "    margin-left: auto !important;",
      "    margin-right: auto !important;",
      "    text-align: center !important;",
      "  }",
      "  #root footer.gb-pro-footer > div:last-child > div > div:first-child p {",
      "    text-align: center !important;",
      "  }",
      "}"
    ].join("\n");
    document.head.appendChild(footerStyle);

    var googleMapsAddressUrl = "https://www.google.com/maps/search/?api=1&query=Paradise%20Towers%20Complex%2C%20No.%2052%2FB%2C%20First%20Floor%2C%20Thennur%20High%20Road%2C%20Tiruchirappalli%2C%20Tamil%20Nadu%20620017";

    Array.from(document.querySelectorAll("footer")).forEach(function (footer) {
      footer.classList.add("gb-pro-footer");

      var footerInner = footer.firstElementChild;
      var footerGrid = footerInner ? footerInner.firstElementChild : null;
      var footerColumns = footerGrid ? Array.from(footerGrid.children) : [];
      var brandColumn = footerColumns[0];
      var supportColumn = footerColumns[1];
      if (brandColumn) {
        brandColumn.classList.add("gb-brand-column");
      }
      if (supportColumn) {
        supportColumn.classList.add("gb-support-column");
        if (!supportColumn.querySelector(".gb-support-heading")) {
          var supportHeading = document.createElement("h3");
          supportHeading.className = "gb-support-heading text-white font-bold text-sm uppercase tracking-[0.15em] mb-1";
          supportHeading.textContent = "Our Support";
          supportColumn.insertBefore(supportHeading, supportColumn.firstChild);
        } else {
          supportColumn.querySelector(".gb-support-heading").textContent = "Our Support";
        }
      }

      Array.from(footer.querySelectorAll("address")).forEach(function (address) {
        var addressText = address.textContent.replace(/\s+/g, " ").trim();
        if (address.closest(".gb-map-address-link")) {
          return;
        }
        if (addressText.indexOf("Paradise Towers") === -1 && addressText.indexOf("Thennur High Road") === -1) {
          return;
        }
        var addressLink = document.createElement("a");
        addressLink.href = googleMapsAddressUrl;
        addressLink.target = "_blank";
        addressLink.rel = "noopener noreferrer";
        addressLink.className = "gb-map-address-link no-underline";
        address.parentNode.insertBefore(addressLink, address);
        addressLink.appendChild(address);
      });

      var quickLinksHeading = Array.from(footer.querySelectorAll("h3")).find(function (heading) {
        return heading.textContent.trim() === "Quick Links";
      });
      var quickLinksColumn = quickLinksHeading ? quickLinksHeading.parentElement : null;
      if (quickLinksColumn) {
        quickLinksColumn.classList.add("gb-quick-links-column");
        Array.from(quickLinksColumn.querySelectorAll("a")).forEach(function (link) {
          var label = link.textContent.trim();
          if (label === "Admin Login" || label === "Terms and Conditions" || label === "Privacy Policy" || label === "Refund Policy") {
            link.remove();
          }
        });
      }

      var socialLabel = Array.from(footer.querySelectorAll("p")).find(function (item) {
        return item.textContent.trim() === "Stay Connected";
      });
      var socialBlock = socialLabel ? socialLabel.parentElement : null;
      if (socialBlock) {
        socialBlock.classList.add("gb-social-block");
        socialLabel.classList.add("gb-social-label");
        socialLabel.textContent = "Social Media";

        Array.from(socialBlock.querySelectorAll("a[aria-label]")).forEach(function (link) {
          var label = link.getAttribute("aria-label");
          if (label === "WhatsApp" || label === "Email" || label === "Call") {
            link.remove();
          }
        });

        if (brandColumn && socialBlock.parentElement !== brandColumn) {
          brandColumn.appendChild(socialBlock);
        }
      }
    });

    var goobookUrl = "https://gobook.gobrightglobal.com/";
    var billingSoftwareImage = document.querySelector('img[alt="Billing Software"]');
    if (billingSoftwareImage) {
      billingSoftwareImage.src = billingSoftwareImage.src.replace(
        /assets\/img\/services\/service-3\/img-2\.png(?:\?.*)?$/,
        "assets/img/GooBook.jpg"
      );
      billingSoftwareImage.alt = "GooBook Billing Software";
      billingSoftwareImage.classList.remove("object-cover");
      billingSoftwareImage.classList.add("object-contain", "bg-white", "p-4", "sm:p-8");
    }
    Array.from(document.querySelectorAll(".gb-goobook-service-card")).forEach(function (link) {
      link.href = goobookUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
    Array.from(document.querySelectorAll(".gb-goobook-section a")).forEach(function (link) {
      if (link.textContent.replace(/\s+/g, " ").trim() !== "Request Demo") return;
      link.href = goobookUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });

    var topBarWrap = document.querySelector(".sticky.top-0.z-50 > .overflow-hidden");
    window.addEventListener("scroll", function () {
      if (!topBarWrap) return;
      var compact = window.scrollY > 50;
      topBarWrap.style.maxHeight = compact ? "0px" : "44px";
      topBarWrap.style.opacity = compact ? "0" : "1";
    }, { passive: true });

    var header = document.querySelector("header");
    var menuButton = document.querySelector('button[aria-label="Toggle menu"]');
    var mobileDrawer = header ? header.querySelector(".md\\:hidden.overflow-hidden.transition-all") : null;
    if (menuButton && mobileDrawer) {
      menuButton.addEventListener("click", function () {
        var isOpen = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!isOpen));
        swapClasses(
          mobileDrawer,
          isOpen ? ["max-h-[600px]", "opacity-100"] : ["max-h-0", "opacity-0"],
          isOpen ? ["max-h-0", "opacity-0"] : ["max-h-[600px]", "opacity-100"]
        );
      });
    }

    var desktopServices = Array.from(document.querySelectorAll("nav.hidden.md\\:flex .relative"))
      .find(function (item) { return item.textContent.indexOf("Services") !== -1; });
    if (desktopServices) {
      var dropdown = desktopServices.querySelector("ul");
      var dropdownCloseTimer;
      var openDropdown = function () {
        clearTimeout(dropdownCloseTimer);
        swapClasses(dropdown, ["opacity-0", "-translate-y-2", "pointer-events-none"], ["opacity-100", "translate-y-0", "pointer-events-auto"]);
      };
      var closeDropdown = function () {
        dropdownCloseTimer = setTimeout(function () {
          swapClasses(dropdown, ["opacity-100", "translate-y-0", "pointer-events-auto"], ["opacity-0", "-translate-y-2", "pointer-events-none"]);
        }, 200);
      };
      desktopServices.addEventListener("mouseenter", openDropdown);
      desktopServices.addEventListener("mouseleave", closeDropdown);
      dropdown.addEventListener("mouseenter", openDropdown);
      dropdown.addEventListener("mouseleave", closeDropdown);
    }

    Array.from(document.querySelectorAll("button")).forEach(function (button) {
      if (button.textContent.trim() !== "Services") return;
      var panel = button.parentElement ? button.parentElement.querySelector(".overflow-hidden.transition-all") : null;
      button.addEventListener("click", function () {
        if (!panel) return;
        var closed = panel.classList.contains("max-h-0");
        swapClasses(
          panel,
          closed ? ["max-h-0"] : ["max-h-80", "pb-3"],
          closed ? ["max-h-80", "pb-3"] : ["max-h-0"]
        );
      });
    });

    Array.from(document.querySelectorAll('[style*="opacity"]')).forEach(function (el) {
      if (el.style.opacity !== "0") return;
      el.style.opacity = "1";
      if (el.style.transform && el.style.transform.indexOf("translate") !== -1) {
        el.style.transform = "none";
      }
    });

  });
}());
