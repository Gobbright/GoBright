<?php
require_once __DIR__ . '/app/bootstrap.php';
$pageKey = 'home';
$homeStatsPayload = admin_payload();
$homeStatsClientCount = count($homeStatsPayload['gobright_clients'] ?? []);
$homeStatsStart = new DateTimeImmutable('2026-01-18', new DateTimeZone('Asia/Kolkata'));
$homeStatsNow = new DateTimeImmutable('now', new DateTimeZone('Asia/Kolkata'));
$homeStatsMonths = 0;
if ($homeStatsNow >= $homeStatsStart) {
  $homeStatsDiff = $homeStatsStart->diff($homeStatsNow);
  $homeStatsMonths = ($homeStatsDiff->y * 12) + $homeStatsDiff->m;
}
?>
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="website_favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary SEO Meta Tags -->
  <title>Branding & Digital Marketing Agency in Trichy | GoBright</title>
  <meta name="title" content="Branding & Digital Marketing Agency in Trichy | GoBright" />
  <meta name="description"
    content="GoBright – Best Branding & Digital Marketing Agency in Trichy. We craft brand identities, SEO, performance marketing & IT solutions that drive real growth." />

  <meta name="keywords"
    content="branding agency Trichy, digital marketing agency Trichy, best branding company Trichy, logo design Trichy, SEO services Trichy, social media marketing Trichy, performance marketing Trichy, IT solutions Trichy, photography videography Trichy, packaging design Trichy, office branding Trichy, web development Trichy, brand identity design, GoBright, GoBright Global, signage printing Trichy, startup branding Trichy, digital marketing agency Tamil Nadu" />
  <meta name="author" content="GoBright-Anbarasan" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="rating" content="general" />
  <link rel="canonical" href="https://www.gobrightglobal.com/" />

  <!-- ✅ NEW — Language Tags -->
  <link rel="alternate" hreflang="en-IN" href="https://www.gobrightglobal.com/" />
  <link rel="alternate" hreflang="x-default" href="https://www.gobrightglobal.com/" />

  <!-- Geo Tags -->
  <meta name="geo.region" content="IN-TN" />
  <meta name="geo.placename" content="Tiruchirappalli, Tamil Nadu, India" />
  <meta name="geo.position" content="10.7905;78.7047" />
  <meta name="ICBM" content="10.7905, 78.7047" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.gobrightglobal.com/" />
  <meta property="og:title" content="Branding & Digital Marketing Agency in Trichy | GoBright" />
  <meta property="og:description"
    content="GoBright is Trichy's top branding & digital marketing agency. SEO, Google Ads, web design & more. Call us today!" />
  <meta property="og:image" content="https://www.gobrightglobal.com/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="GoBright" />
  <meta property="og:locale" content="en_IN" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://www.gobrightglobal.com/" />
  <meta name="twitter:title" content="Branding & Digital Marketing Agency in Trichy | GoBright" />
  <meta name="twitter:description"
    content="GoBright is Trichy's top branding & digital marketing agency. SEO, Google Ads, web design & more. Call us today!" />
  <meta name="twitter:image" content="https://www.gobrightglobal.com/og-image.jpg" />

  <!-- Schema.org – Local Business -->
  <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.gobrightglobal.com/#organization",
        "name": "GoBright",
        "alternateName": "GoBright Branding & Digital Marketing Agency",
        "url": "https://gobrightglobal.com",
        "logo": "https://gobrightglobal.com/website_favicon.png",
        "image": "https://gobrightglobal.com/og-image.jpg",
        "description": "GoBright is the Best Branding & Digital Marketing Agency in Trichy, Tamil Nadu. We offer SEO Services, Social Media Marketing, Google Ads, Meta Ads, Logo Design, Web Development, Performance Marketing, Interior Branding, Commercial Photography & Videography, Marketing Automation, CRM Integration, and Creative Advertising.",
        "priceRange": "$$",
        "telephone": ["+918925550774", "+919500148123"],
        "email": ["info.gobrightglobal@gmail.com", "gobright.growth@gmail.com"],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Paradise Towers Complex, No. 52/B, First Floor, Thennur High Road",
          "addressLocality": "Tiruchirappalli",
          "addressRegion": "Tamil Nadu",
          "postalCode": "620017",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "10.7905",
          "longitude": "78.7047"
        },
        "areaServed": ["Trichy", "Tiruchirappalli", "Tamil Nadu", "India"],
        "hasMap": "https://www.google.com/maps?q=Tiruchirappalli,Tamil+Nadu",
        "sameAs": [
          "https://www.facebook.com/gobrightglobal",
          "https://www.instagram.com/gobrightglobal",
          "https://www.linkedin.com/in/gobright-global-15245a3a3/",
          "https://twitter.com/gobrightglobal"
        ],
        "serviceType": [
          "Branding Agency",
          "Digital Marketing Agency",
          "SEO Services",
          "Social Media Marketing",
          "Google Ads Management",
          "Meta Ads Services",
          "Logo Design",
          "Website Design",
          "Web Development",
          "Performance Marketing",
          "Interior Branding",
          "Commercial Photography",
          "Videography",
          "Marketing Automation",
          "CRM Integration",
          "Creative Advertising"
        ],
        "knowsAbout": [
          "Brand Identity Design",
          "SEO",
          "Performance Marketing",
          "Google Ads",
          "Meta Ads",
          "Social Media Strategy",
          "Content Marketing",
          "Web Design",
          "IT Solutions"
        ],

        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],

        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "47"
        }
      }
    </script>

  <!-- Schema.org – Organization -->
  <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "GoBright",
        "url": "https://gobrightglobal.com",
        "logo": "https://gobrightglobal.com/website_favicon.png",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+918925550774",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Tamil"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+919500148123",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Tamil"]
          }
        ],
        "sameAs": [
          "https://www.facebook.com/gobrightglobal",
          "https://www.instagram.com/gobrightglobal",
          "https://www.linkedin.com/in/gobright-global-15245a3a3/"
        ]
      }
    </script>

  <!-- Schema.org – WebSite with SearchAction -->
  <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "GoBright",
        "url": "https://gobrightglobal.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://gobrightglobal.com/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    </script>
  <link rel="stylesheet" crossorigin href="assets/css/index-C2hZxh7n.css" />
  <link rel="stylesheet" href="assets/css/home.css" />
  <link rel="sitemap" type="application/xml" title="Sitemap" href="sitemap.xml" />
  <link rel="stylesheet" href="assets/css/responsive.css">
  <!-- Google Tag Manager -->
  <script>(function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({
        'gtm.start':
          new Date().getTime(), event: 'gtm.js'
      }); var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
          'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-WC27GMDN');</script>
  <!-- End Google Tag Manager -->
</head>
</head>

<body>
  <div id="root">
    <link rel="preload" as="image" href="assets/img/logo.png" />
    <link rel="preload" as="image" href="assets/img/Banner/gobright-digital-marketing-agency-trichy-hero-banner.png"`
      fetchpriority="high" media="(max-width: 767px)" />
    <link rel="preload" as="image" href="assets/img/Banner/gobright-digital-marketing-agency-trichy-hero-banner.webp"
      fetchpriority="high" media="(min-width: 768px)" />
    <link rel="preload" as="image" href="assets/img/home_services/services1.png" />
    <link rel="preload" as="image" href="assets/img/whychoose/icon-1.png" />
    <link rel="preload" as="image" href="assets/img/whychoose/icon-2.png" />
    <link rel="preload" as="image" href="assets/img/whychoose/icon-3.png" />
    <link rel="preload" as="image" href="assets/img/clients/sri-venkateswara-textiles-logo.webp" />
    <link rel="preload" as="image" href="assets/img/clients/kwik-ecabs-logo.webp" />
    <link rel="preload" as="image" href="assets/img/clients/ivory-code-logo.webp" />
    <link rel="preload" as="image" href="assets/img/clients/kurunchi-holiday-logo.webp" />
    <link rel="preload" as="image" href="assets/img/clients/prana-rehabilitation-centre-logo.webp" />
    <link rel="preload" as="image" href="assets/img/clients/buyy-tech-logo.webp" />
    <link rel="preload" as="image" href="assets/img/clients/gskt-logo.webp.webp" />
    <link rel="preload" as="image" href="assets/img/clients/jayaraj-logo.webp" />
    <link rel="preload" as="image" href="assets/img/teams/mr-thanga-durai-managing-director-gobright.webp" />
    <link rel="preload" as="image" href="assets/img/teams/mr-sridhar-executive-director-gobright.webp" />
    <link rel="preload" as="image"
      href="assets/img/teams/mr-dhayala-prakash-chief-administrative-officer-gobright.webp" />
    <link rel="preload" as="image" href="assets/img/teams/mrs-akila-administrative-officer-gobright.webp" />
    <link rel="preload" as="image" href="assets/img/teams/mr-vignesh-senior-it-executive-gobright.webp" />
    <link rel="preload" as="image" href="assets/img/teams/mr-praveen-content-creator-gobright.webp" />
    <link rel="preload" as="image" href="assets/img/teams/mr-bala-ganesan-content-creator-gobright.webp" />
    <link rel="preload" as="image" href="assets/img/teams/mr-fradrick-full-stack-developer-gobright.webp" />
    <link rel="preload" as="image" href="assets/img/teams/mr-anbarasan-full-stack-developer-gobright.webp" />
    <div class="sticky top-0 z-50">
      <div class="overflow-hidden" style="
            max-height: 44px;
            opacity: 1;
            transition:
              max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.3s ease;
          ">
        <div class="bg-[#0a0a0a] border-b border-[#1e1e1e] flex items-center h-11">
          <div class="flex-1 overflow-hidden mx-2 sm:mx-3 relative">
            <div
              class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none">
            </div>
            <div
              class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none">
            </div>
            <div class="animate-marquee flex items-center gap-0 whitespace-nowrap">
              <span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Branding &amp;
                  Identity</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Logo
                  Design</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Digital
                  Marketing</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Social Media
                  Marketing</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">SEO
                  Services</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Performance
                  Marketing</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">IT &amp; Tech
                  Solutions</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Photography &amp;
                  Videography</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Packaging
                  Design</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Signage &amp;
                  Printing</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Office
                  Branding</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Web
                  Development</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Branding &amp;
                  Identity</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Logo
                  Design</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Digital
                  Marketing</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Social Media
                  Marketing</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">SEO
                  Services</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Performance
                  Marketing</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">IT &amp; Tech
                  Solutions</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Photography &amp;
                  Videography</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Packaging
                  Design</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Signage &amp;
                  Printing</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Office
                  Branding</span></span><span class="flex items-center gap-3 text-[0.72rem] font-medium"><span
                  class="text-[#e32028] text-[10px]">★</span><span class="text-[#999] pr-3">Web
                  Development</span></span>
            </div>
          </div>
        </div>
      </div>
      <header class="bg-[#0d0d0d] border-b border-[#1a1a1a]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-[70px] flex items-center justify-between gap-4">
          <a class="flex items-center flex-shrink-0" href="./"><img src="assets/img/logo.png" alt="GoBright logo"
              class="h-[80px] w-auto object-contain" /></a><button
            class="md:hidden flex flex-col justify-center gap-[5px] bg-transparent border-none cursor-pointer p-2 ml-auto min-w-[44px] min-h-[44px]"
            aria-label="Toggle menu" aria-expanded="false">
            <span class="block w-6 h-0.5 bg-[#cccccc] rounded-sm transition-all duration-300"></span><span
              class="block w-6 h-0.5 bg-[#cccccc] rounded-sm transition-all duration-200"></span><span
              class="block w-6 h-0.5 bg-[#cccccc] rounded-sm transition-all duration-300"></span>
          </button>
          <nav class="gb-primary-nav hidden md:flex items-center gap-8" aria-label="Primary navigation">
            <a class="no-underline text-[1.05rem] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap text-[#e32028]"
              href="./" aria-current="page">Home</a><a
              class="no-underline text-[1.05rem] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap text-[#cccccc] hover:text-[#e32028]"
              href="about/about.php">About us</a>
            <div class="relative">
              <a class="no-underline text-[1.05rem] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap text-[#cccccc] hover:text-[#e32028] flex items-center gap-1"
                href="services/services.php">Services<svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                  class="transition-transform duration-200">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                    stroke-linejoin="round"></path>
                </svg></a>
              <ul
                class="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 bg-[#161616] border border-[#2a2a2a] rounded-xl py-2 list-none m-0 min-w-[220px] shadow-[0_8px_32px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out opacity-0 -translate-y-2 pointer-events-none">
                <li>
                  <a class="flex items-center gap-2 px-5 py-3 text-[#cccccc] no-underline text-[0.88rem] transition-colors duration-200 hover:text-[#e32028] hover:bg-[#1f1f1f]"
                    href="services/branding-&amp;-brand-identity/branding-&amp;-brand-identity.php"><span
                      class="w-1.5 h-1.5 rounded-full bg-[#e32028]/60 flex-shrink-0"></span>Branding &amp; Brand
                    Identity</a>
                </li>
                <li>
                  <a class="flex items-center gap-2 px-5 py-3 text-[#cccccc] no-underline text-[0.88rem] transition-colors duration-200 hover:text-[#e32028] hover:bg-[#1f1f1f]"
                    href="services/digital-marketing/digital-marketing.php"><span
                      class="w-1.5 h-1.5 rounded-full bg-[#e32028]/60 flex-shrink-0"></span>Digital Marketing</a>
                </li>
                <li>
                  <a class="flex items-center gap-2 px-5 py-3 text-[#cccccc] no-underline text-[0.88rem] transition-colors duration-200 hover:text-[#e32028] hover:bg-[#1f1f1f]"
                    href="services/tech-solutions/tech-solutions.php"><span
                      class="w-1.5 h-1.5 rounded-full bg-[#e32028]/60 flex-shrink-0"></span>Tech Solutions</a>
                </li>
                <li>
                  <a class="flex items-center gap-2 px-5 py-3 text-[#cccccc] no-underline text-[0.88rem] transition-colors duration-200 hover:text-[#e32028] hover:bg-[#1f1f1f]"
                    href="services/photography-&amp;-videography/photography-&amp;-videography.php"><span
                      class="w-1.5 h-1.5 rounded-full bg-[#e32028]/60 flex-shrink-0"></span>Photography &amp;
                    Videography</a>
                </li>
                <li>
                  <a class="flex items-center gap-2 px-5 py-3 text-[#cccccc] no-underline text-[0.88rem] transition-colors duration-200 hover:text-[#e32028] hover:bg-[#1f1f1f]"
                    href="services/other-services/other-services.php"><span
                      class="w-1.5 h-1.5 rounded-full bg-[#e32028]/60 flex-shrink-0"></span>Other Services</a>
                </li>
              </ul>
            </div>
            <a class="no-underline text-[1.05rem] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap text-[#cccccc] hover:text-[#e32028]"
              href="industries/industries.php">Industries</a><a
              class="no-underline text-[1.05rem] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap text-[#cccccc] hover:text-[#e32028]"
              href="contact/contact.php">Contact us</a>
          </nav>
          <a class="hidden md:flex items-center gap-2 bg-[#e32028] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#c41c22] transition-all duration-200 shadow-[0_0_15px_rgba(227,32,40,0.3)] hover:shadow-[0_0_25px_rgba(227,32,40,0.5)] whitespace-nowrap flex-shrink-0 no-underline"
            href="contact/contact.php">Let&#x27;s Build Together<svg width="13" height="13" viewBox="0 0 14 14"
              fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="white" stroke-width="1.6" stroke-linecap="round"
                stroke-linejoin="round"></path>
            </svg></a>
        </div>
        <div class="md:hidden overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0">
          <nav class="flex flex-col border-t border-[#1a1a1a] bg-[#0d0d0d] px-5 py-3 gap-1">
            <a class="py-3 text-[1rem] font-medium no-underline border-b border-[#1a1a1a] transition-colors text-[#e32028]"
              href="./">Home</a><a
              class="py-3 text-[1rem] font-medium no-underline border-b border-[#1a1a1a] transition-colors text-[#cccccc] hover:text-[#e32028]"
              href="about/about.php">About us</a>
            <div class="border-b border-[#1a1a1a]">
              <button
                class="flex items-center justify-between w-full py-3 text-[1rem] font-medium text-[#cccccc] hover:text-[#e32028] transition-colors text-left min-h-[44px]">
                <span class="">Services</span><svg width="16" height="16" viewBox="0 0 12 12" fill="none"
                  class="transition-transform duration-300 flex-shrink-0 text-[#666]">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                    stroke-linejoin="round"></path>
                </svg>
              </button>
              <div class="overflow-hidden transition-all duration-300 ease-in-out max-h-0">
                <div class="flex flex-col gap-1 pl-3 border-l-2 border-[#e32028]/30 ml-2">
                  <a class="flex items-center gap-2 py-2.5 text-[0.93rem] no-underline transition-colors min-h-[40px] text-[#888] hover:text-[#e32028]"
                    href="services/branding-&amp;-brand-identity/branding-&amp;-brand-identity.php"><span
                      class="w-1 h-1 rounded-full bg-current flex-shrink-0"></span>Branding &amp; Brand Identity</a><a
                    class="flex items-center gap-2 py-2.5 text-[0.93rem] no-underline transition-colors min-h-[40px] text-[#888] hover:text-[#e32028]"
                    href="services/digital-marketing/digital-marketing.php"><span
                      class="w-1 h-1 rounded-full bg-current flex-shrink-0"></span>Digital Marketing</a><a
                    class="flex items-center gap-2 py-2.5 text-[0.93rem] no-underline transition-colors min-h-[40px] text-[#888] hover:text-[#e32028]"
                    href="services/tech-solutions/tech-solutions.php"><span
                      class="w-1 h-1 rounded-full bg-current flex-shrink-0"></span>Tech Solutions</a><a
                    class="flex items-center gap-2 py-2.5 text-[0.93rem] no-underline transition-colors min-h-[40px] text-[#888] hover:text-[#e32028]"
                    href="services/photography-&amp;-videography/photography-&amp;-videography.php"><span
                      class="w-1 h-1 rounded-full bg-current flex-shrink-0"></span>Photography &amp; Videography</a><a
                    class="flex items-center gap-2 py-2.5 text-[0.93rem] no-underline transition-colors min-h-[40px] text-[#888] hover:text-[#e32028]"
                    href="services/other-services/other-services.php"><span
                      class="w-1 h-1 rounded-full bg-current flex-shrink-0"></span>Other Services</a>
                </div>
              </div>
            </div>
            <a class="py-3 text-[1rem] font-medium no-underline border-b border-[#1a1a1a] transition-colors text-[#cccccc] hover:text-[#e32028]"
              href="industries/industries.php">Industries We Serve</a><a
              class="py-3 text-[1rem] font-medium no-underline border-b border-[#1a1a1a] transition-colors text-[#cccccc] hover:text-[#e32028]"
              href="contact/contact.php">Contact us</a><a
              class="mt-3 mb-1 bg-[#e32028] text-white px-5 py-3.5 rounded-xl font-bold text-sm hover:bg-[#c41c22] transition-colors no-underline text-center block shadow-[0_0_20px_rgba(227,32,40,0.35)]"
              href="contact/contact.php">Let&#x27;s Build Together →</a>
          </nav>
        </div>
      </header>
    </div>

    <section class="gb-hero" data-hero aria-roledescription="carousel" aria-label="GoBright services">
      <div class="gb-hero__viewport" aria-live="polite">
        <article class="gb-hero__slide is-active" data-hero-slide aria-hidden="false">
          <picture class="gb-hero__media">
            <source media="(max-width: 767px)"
              srcset="assets/img/Banner/gobright-digital-marketing-agency-trichy-hero-banner.png" />
            <img src="assets/img/Banner/gobright-digital-marketing-agency-trichy-hero-banner.png"
              alt="GoBright branding and digital marketing team in Trichy" fetchpriority="high" decoding="async" />
          </picture>
          <div class="gb-hero__shade" aria-hidden="true"></div>
          <div class="gb-hero__content">
            <p class="gb-hero__eyebrow">Best Branding &amp; Digital Marketing Agency in Trichy</p>
            <h1><em>Best</em> Branding &amp; Digital Marketing <span>Agency in Trichy Driving Global Brand Growth</span>
            </h1>
            <p class="gb-hero__summary">GoBright is a Trichy-based branding and digital marketing agency helping
              businesses build trusted brands and grow through SEO, paid media, web and creative services.</p>
            <div class="gb-hero__actions">
              <a class="gb-hero__button gb-hero__button--primary" href="services/services.php">Explore Services</a>
              <a class="gb-hero__button gb-hero__button--secondary" href="contact/contact.php">Get in Touch</a>
            </div>
          </div>
        </article>

        <article class="gb-hero__slide" data-hero-slide aria-hidden="true">
          <picture class="gb-hero__media">
            <img data-src="assets/img/Banner/digital_marketing_lady_left_right_empty_banner.png"
              alt="Best digital marketing agency in Trichy for SEO, social media marketing, Google Ads, Meta Ads and lead generation"
              decoding="async" />
          </picture>
          <div class="gb-hero__shade" aria-hidden="true"></div>
          <div class="gb-hero__content">
            <p class="gb-hero__eyebrow">Best Digital Marketing Agency in Trichy</p>
            <h2><em>Grow Faster in Trichy</em> With <span>SEO, Social Media &amp; Performance Marketing</span></h2>
            <p class="gb-hero__summary">GoBright delivers result-driven digital marketing services in Trichy through
              local SEO, Google Ads, Meta Ads, social media marketing, content strategy and qualified lead generation.
            </p>
            <div class="gb-hero__actions">
              <a class="gb-hero__button gb-hero__button--primary"
                href="services/digital-marketing/digital-marketing.php">Digital Marketing Services</a>
              <a class="gb-hero__button gb-hero__button--secondary" href="contact/contact.php">Get Free Consultation</a>
            </div>
          </div>
        </article>

        <article class="gb-hero__slide" data-hero-slide aria-hidden="true">
          <picture class="gb-hero__media">
            <source media="(max-width: 767px)"
              data-srcset="assets/img/Banner/brand-growth-digital-marketing-strategy-banner.png" />
            <img data-src="assets/img/Banner/brand-growth-digital-marketing-strategy-banner.png"
              alt="Brand growth and digital marketing strategy by GoBright" decoding="async" />
          </picture>
          <div class="gb-hero__shade" aria-hidden="true"></div>
          <div class="gb-hero__content">
            <p class="gb-hero__eyebrow">Summary</p>
            <h2><em>Short answer:</em> GoBright supports <span>startups, SMEs &amp; growing businesses</span></h2>
            <p class="gb-hero__summary"><strong>Short answer:</strong> GoBright is a branding and digital marketing
              agency for startups, SMEs, and growing businesses in Trichy and Tamil Nadu that need SEO, paid ads,
              websites, creative content, and lead generation support. <span class="gb-hero__bottom-line"><strong>Key
                  takeaway:</strong> GoBright connects brand strategy, digital growth, and technology in one
                team.</span></p>
            <div class="gb-hero__actions">
              <a class="gb-hero__button gb-hero__button--primary" href="services/services.php">Explore Services</a>
              <a class="gb-hero__button gb-hero__button--secondary" href="contact/contact.php">Get in Touch</a>
            </div>
          </div>
        </article>
        <article class="gb-hero__slide" data-hero-slide aria-hidden="true">
          <picture class="gb-hero__media">
            <source media="(max-width: 767px)"
              data-srcset="assets/img/Banner/digital-marketing-services-trichy-hero-banner.png" />
            <img data-src="assets/img/Banner/digital-marketing-services-trichy-hero-banner.png"
              alt="Creative growth strategy and digital marketing services for ambitious businesses" decoding="async" />
          </picture>
          <div class="gb-hero__shade" aria-hidden="true"></div>
          <div class="gb-hero__content">
            <p class="gb-hero__eyebrow">Trichy's Most Trusted Growth Partner</p>
            <h2><em>Empowering</em> Businesses With <span>Bold Ideas &amp; Lasting Impact</span></h2>
            <p class="gb-hero__summary">From startups finding their voice to established brands seeking new momentum,
              our creative strategy turns ambition into sustainable business growth.</p>
            <div class="gb-hero__actions">
              <a class="gb-hero__button gb-hero__button--primary" href="services/services.php">Explore Services</a>
              <a class="gb-hero__button gb-hero__button--secondary" href="contact/contact.php">Get in Touch</a>
            </div>
          </div>
        </article>
      </div>

      <button class="gb-hero__arrow gb-hero__arrow--prev" type="button" data-hero-prev aria-label="Previous banner">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button class="gb-hero__arrow gb-hero__arrow--next" type="button" data-hero-next aria-label="Next banner">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>
      <div class="gb-hero__dots" role="group" aria-label="Choose banner">
        <button class="is-active" type="button" data-hero-dot aria-label="Show banner 1" aria-current="true"></button>
        <button type="button" data-hero-dot aria-label="Show banner 2"></button>
        <button type="button" data-hero-dot aria-label="Show banner 3"></button>
        <button type="button" data-hero-dot aria-label="Show banner 4"></button>
      </div>
    </section>

    <template id="home-answer-summary">
      <div class="gb-answer-summary__glow" aria-hidden="true"></div>
      <div class="gb-answer-summary__inner">
        <div class="gb-answer-summary__intro">
          <div class="gb-answer-summary__eyebrow">
            <span></span>
            <p>Strategy • Creative • Performance</p>
          </div>
          <h2 id="home-answer-title" class="gb-answer-summary__title">
            Branding &amp; Digital Marketing Agency in Trichy
            <span>for Growing Businesses</span>
          </h2>
          <p class="gb-answer-summary__answer">
            <strong>Page summary:</strong> GoBright is a Trichy-based branding
            and digital marketing agency that helps startups, SMEs, and growing
            companies build a clear brand, attract qualified leads, and scale
            through strategy, creative, SEO, paid media, websites, automation,
            photography, and video.
          </p>
          <p class="gb-answer-summary__updated">
            <span aria-hidden="true"></span>
            Content reviewed and updated
            <time datetime="2026-08-01">1 August 2026</time>
          </p>
        </div>
        <div class="gb-answer-summary__points" aria-label="GoBright key outcomes">
          <article>
            <span class="gb-answer-summary__number">01</span>
            <div>
              <h2>Build a memorable brand</h2>
              <p>Positioning, identity, messaging, packaging, and brand systems designed to earn trust.</p>
            </div>
          </article>
          <article>
            <span class="gb-answer-summary__number">02</span>
            <div>
              <h2>Generate measurable demand</h2>
              <p>SEO, content, social media, and performance campaigns aligned to qualified enquiries.</p>
            </div>
          </article>
          <article>
            <span class="gb-answer-summary__number">03</span>
            <div>
              <h2>Scale with technology</h2>
              <p>Websites, software, CRM, and automation that connect marketing effort to business growth.</p>
            </div>
          </article>
          <article>
            <span class="gb-answer-summary__number">04</span>
            <div>
              <h2>Create content that connects</h2>
              <p>Photography, video, campaign creatives, and brand storytelling designed to capture attention.</p>
            </div>
          </article>

        </div>
      </div>
    </template>

    <section class="gb-home-about" aria-labelledby="home-about-title">
      <div class="gb-home-about__inner">
        <header class="gb-home-about__header">
          <div class="gb-home-about__eyebrow" aria-hidden="true">
            <span></span>
            <p>About Us</p>
            <span></span>
          </div>
          <h2 id="home-about-title">Built to turn Ambition into <span>lasting brand value</span></h2>
          <p>GoBright brings strategy, creativity, marketing, and technology together to help businesses become clear,
            trusted, and ready to lead.</p>
        </header>

        <div class="gb-home-about__cards">
          <article class="gb-home-about__card">
            <span class="gb-home-about__icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="13" stroke="currentColor" stroke-width="2" />
                <circle cx="24" cy="24" r="5" stroke="currentColor" stroke-width="2" />
                <path d="M24 4v7M24 37v7M4 24h7M37 24h7" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" />
              </svg>
            </span>
            <p class="gb-home-about__label">Our Mission</p>
            <h3>Make growth intentional</h3>
            <p>We combine insight, strategy, creativity, and technology to turn business goals into distinctive brands
              and measurable market momentum.</p>
          </article>

          <article class="gb-home-about__card gb-home-about__card--featured">
            <span class="gb-home-about__icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M5 24s7-12 19-12 19 12 19 12-7 12-19 12S5 24 5 24Z" stroke="currentColor" stroke-width="2"
                  stroke-linejoin="round" />
                <circle cx="24" cy="24" r="6" stroke="currentColor" stroke-width="2" />
                <circle cx="24" cy="24" r="2" fill="currentColor" />
              </svg>
            </span>
            <p class="gb-home-about__label">Our Vision</p>
            <h3>Help ambitious brands lead</h3>
            <p>From Trichy to global markets, we aim to be the trusted growth partner behind relevant, resilient, and
              future-ready category leaders.</p>
          </article>

          <article class="gb-home-about__card">
            <span class="gb-home-about__icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="m24 5 15 10-15 28L9 15 24 5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                <path d="m9 15 15 8 15-8M24 23v20M17 10l7 13 7-13" stroke="currentColor" stroke-width="2"
                  stroke-linejoin="round" />
              </svg>
            </span>
            <p class="gb-home-about__label">Our Values</p>
            <h3>Clarity. Originality. Ownership.</h3>
            <p>We listen deeply, think independently, communicate honestly, and execute with discipline—because lasting
              results require accountable partnership.</p>
          </article>
        </div>
      </div>
    </section>

    <template id="legacy-home-hero">
      <div class="relative block md:hidden">
        <img src="assets/img/Banner/gobright-digital-marketing-agency-trichy-hero-banner.png"
          alt="GoBright Digital Marketing Agency in Trichy providing SEO, branding and web development services"
          decoding="async" fetchpriority="high"
          class="w-full h-auto transition-opacity duration-700 opacity-100 md:hidden" /><img
          src="assets/img/Banner/digital-marketing-services-trichy-hero-banner.png"
          alt="Digital marketing services in Trichy including SEO, social media marketing, PPC advertising, analytics and content marketing"
          decoding="async" fetchpriority="auto"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 md:hidden" /><img
          src="assets/img/Banner/brand-growth-digital-marketing-strategy-banner.png"
          alt="Brand growth and digital marketing strategy services by GoBright agency in Trichy" decoding="async"
          fetchpriority="auto"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 md:hidden" />
        <div
          class="home-hero-mobile-copy absolute z-10 block md:hidden transition-opacity duration-700 opacity-100 pointer-events-none">
          <div class="home-hero-mobile-kicker">
            <span></span>
            <p>Best Branding &amp; Digital Marketing Agency in Trichy</p>
          </div>
          <p class=home-hero-mobile-title role=heading aria-level=1>
            <span>Best</span> Branding &amp;<br />
            Digital Marketing<br />
            <strong>Agency in Trichy Driving<br />Global Brand Growth</strong>
          </p>
          <p class="home-hero-mobile-body">
            Welcome to GoBright, a creative branding agency dedicated to
            shaping strong brand identities, impactful digital experiences,
            and result-driven marketing strategies. We help businesses
            transform ideas into memorable brands that inspire trust and drive
            success.
          </p>
          <a class="home-hero-mobile-cta" href="contact/contact.php">Get in Touch</a>
        </div>
        <div
          class="home-hero-mobile-copy home-hero-mobile-copy--banner2 absolute z-10 block md:hidden transition-opacity duration-700 opacity-0 pointer-events-none">
          <div class="home-hero-mobile-kicker">
            <span></span>
            <p>Trichy&#x27;s Most Trusted Growth Partner</p>
          </div>
          <p class=home-hero-mobile-title role=heading aria-level=1>
            <span>Empowering</span><br />
            Businesses With<br />
            <strong>Bold Ideas &amp; Lasting Impact</strong>
          </p>
          <p class="home-hero-mobile-body">
            Whether you&#x27;re a startup finding your voice or an established
            brand seeking fresh momentum, GoBright brings the creativity,
            strategy, and passion to take your business to the next level.
          </p>
          <a class="home-hero-mobile-cta" href="contact/contact.php">Get in Touch</a>
        </div>
        <div
          class="home-hero-mobile-copy home-hero-mobile-copy--banner3 absolute z-10 block md:hidden transition-opacity duration-700 opacity-0 pointer-events-none">
          <div class="home-hero-mobile-kicker">
            <span></span>
            <p>Where Vision Meets Execution</p>
          </div>
          <p class=home-hero-mobile-title role=heading aria-level=1>
            <span>Your Brand Deserves</span> More Than<br />
            <strong>Just a Logo - It Deserves a Legacy</strong>
          </p>
          <p class="home-hero-mobile-body">
            At GoBright, we don&#x27;t just design - we build brands that speak,
            connect, and convert. From strategy to storytelling, we craft every
            detail to position your business as an industry leader.
          </p>
          <a class="home-hero-mobile-cta" href="contact/contact.php">Get in Touch</a>
        </div>
      </div>
      <img src="assets/img/Banner/gobright-digital-marketing-agency-trichy-hero-banner.webp"
        alt="GoBright Digital Marketing Agency in Trichy providing SEO, branding and web development services"
        decoding="async" fetchpriority="high"
        class="absolute inset-0 hidden w-full h-full transition-opacity duration-700 object-cover object-[72%_center] contrast-[1.05] saturate-[1.05] md:block md:object-contain md:object-right md:contrast-[1.1] md:saturate-[1.08] opacity-100" /><img
        src="assets/img/Banner/digital-marketing-services-trichy-hero-banner.webp"
        alt="Digital marketing services in Trichy including SEO, social media marketing, PPC advertising, analytics and content marketing"
        decoding="async" fetchpriority="auto"
        class="absolute inset-0 hidden w-full h-full transition-opacity duration-700 object-cover object-[78%_center] contrast-[1.05] saturate-[1.05] md:block md:object-contain md:object-right md:contrast-[1.1] md:saturate-[1.08] opacity-0" /><img
        src="assets/img/Banner/brand-growth-digital-marketing-strategy-banner.png"
        alt="Brand growth and digital marketing strategy services by GoBright agency in Trichy" decoding="async"
        fetchpriority="auto"
        class="absolute inset-0 hidden w-full h-full transition-opacity duration-700 object-cover object-[82%_center] contrast-[1.05] saturate-[1.05] md:block md:object-contain md:object-right md:contrast-[1.1] md:saturate-[1.08] opacity-0" />
      <div
        class="absolute inset-0 hidden md:block bg-linear-to-r from-[#0d0d0d] from-32% via-[#0d0d0d]/95 via-45% to-transparent to-68% pointer-events-none">
      </div>
      <div class="absolute inset-y-0 left-[38%] hidden w-[28%] md:block pointer-events-none" style="
            background: radial-gradient(
              ellipse at center,
              rgba(227, 32, 40, 0.13) 0%,
              rgba(13, 13, 13, 0.38) 35%,
              transparent 72%
            );
            filter: blur(18px);
          "></div>
      <div class="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-[#0d0d0d]/80 to-transparent pointer-events-none">
      </div>
      <div class="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#0d0d0d]/80 to-transparent pointer-events-none">
      </div>
      <div class="absolute bottom-0 left-[-20%] right-[-20%] h-[35%] pointer-events-none" style="
            background-image:
              linear-gradient(rgba(227, 32, 40, 0.4) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(227, 32, 40, 0.4) 1px,
                transparent 1px
              );
            background-size: 50px 50px;
            transform: perspective(400px) rotateX(55deg);
            transform-origin: bottom center;
            opacity: 0.35;
          "></div>
      <div class="relative z-10 hidden md:flex md:items-center md:min-h-[88vh]">
        <div class="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-8 py-5 md:py-24">
          <div class="relative w-full md:w-[50%] sm:min-h-[22rem]">
            <div
              class="flex flex-col justify-center sm:absolute sm:inset-0 sm:transition-opacity sm:duration-700 sm:opacity-100 sm:pointer-events-auto">
              <div class="hidden md:flex items-center gap-2 mb-4">
                <span class="w-8 sm:w-12 h-0.5 bg-[#e32028] shrink-0"></span><span
                  class="text-[#e32028] text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.15em] uppercase leading-snug">Best
                  Branding &amp; Digital Marketing Agency in
                  Trichy</span>
              </div>
              <p role="heading" aria-level="2"
                class="hidden md:block text-white text-[1.4rem] sm:text-[2.1rem] md:text-[2.6rem] font-bold leading-tight mb-4">
                <span class="text-[#e32028] italic">Best</span> Branding &amp;
                Digital Marketing<!-- -->
                <span class="text-[#e32028]">Agency in Trichy Driving Global Brand Growth</span>
              </p>
              <p
                class="hidden md:block text-[#aaaaaa] text-[0.85rem] sm:text-[0.9rem] md:text-[0.97rem] leading-relaxed mb-7 max-w-xl">
                Welcome to GoBright, a creative branding agency dedicated to
                shaping strong brand identities, impactful digital
                experiences, and result-driven marketing strategies. We help
                businesses transform ideas into memorable brands that inspire
                trust and drive success.
              </p>
              <div class="flex flex-wrap gap-3">
                <a href="services/services.php"
                  class="bg-[#e32028] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-md font-semibold text-[0.85rem] sm:text-[0.92rem] hover:bg-[#c41c22] transition-colors duration-200 no-underline">Our
                  Services</a><a href="contact/contact.php"
                  class="border border-[#555] text-[#cccccc] px-5 sm:px-7 py-2.5 sm:py-3 rounded-md font-semibold text-[0.85rem] sm:text-[0.92rem] hover:border-[#e32028] hover:text-[#e32028] transition-colors duration-200 no-underline">Get
                  in Touch</a>
              </div>
            </div>
            <div
              class="flex flex-col justify-center sm:absolute sm:inset-0 sm:transition-opacity sm:duration-700 hidden sm:flex sm:opacity-0 sm:pointer-events-none">
              <div class="flex items-center gap-2 mb-4">
                <span class="w-8 sm:w-12 h-0.5 bg-[#e32028] shrink-0"></span><span
                  class="text-[#e32028] text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.15em] uppercase leading-snug">Trichy&#x27;s
                  Most Trusted Growth Partner</span>
              </div>
              <p role="heading" aria-level="2"
                class="text-white text-[1.4rem] sm:text-[2.1rem] md:text-[2.6rem] font-bold leading-tight mb-4">
                <span class="text-[#e32028]">Empowering</span> Businesses With<!-- -->
                <span class="text-[#e32028]">Bold Ideas &amp; Lasting Impact</span>
              </p>
              <p class="text-[#aaaaaa] text-[0.85rem] sm:text-[0.9rem] md:text-[0.97rem] leading-relaxed mb-7 max-w-xl">
                Whether you&#x27;re a startup finding your voice or an
                established brand seeking fresh momentum, GoBright brings the
                creativity, strategy, and passion to take your business to the
                next level.
              </p>
              <div class="flex flex-wrap gap-3">
                <a href="services/services.php"
                  class="bg-[#e32028] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-md font-semibold text-[0.85rem] sm:text-[0.92rem] hover:bg-[#c41c22] transition-colors duration-200 no-underline">Our
                  Services</a><a href="contact/contact.php"
                  class="border border-[#555] text-[#cccccc] px-5 sm:px-7 py-2.5 sm:py-3 rounded-md font-semibold text-[0.85rem] sm:text-[0.92rem] hover:border-[#e32028] hover:text-[#e32028] transition-colors duration-200 no-underline">Get
                  in Touch</a>
              </div>
            </div>
            <div
              class="flex flex-col justify-center sm:absolute sm:inset-0 sm:transition-opacity sm:duration-700 hidden sm:flex sm:opacity-0 sm:pointer-events-none">
              <div class="flex items-center gap-2 mb-4">
                <span class="w-8 sm:w-12 h-0.5 bg-[#e32028] shrink-0"></span><span
                  class="text-[#e32028] text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.15em] uppercase leading-snug">Where
                  Vision Meets Execution</span>
              </div>
              <p role="heading" aria-level="2"
                class="text-white text-[1.4rem] sm:text-[2.1rem] md:text-[2.6rem] font-bold leading-tight mb-4">
                <span class="text-[#e32028]">Your Brand Deserves</span> More
                Than<!-- -->
                <span class="text-[#e32028]">Just a Logo - It Deserves a Legacy</span>
              </p>
              <p class="text-[#aaaaaa] text-[0.85rem] sm:text-[0.9rem] md:text-[0.97rem] leading-relaxed mb-7 max-w-xl">
                At GoBright, we don&#x27;t just design - we build brands that
                speak, connect, and convert. From strategy to storytelling, we
                craft every detail to position your business as an industry
                leader.
              </p>
              <div class="flex flex-wrap gap-3">
                <a href="services/services.php"
                  class="bg-[#e32028] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-md font-semibold text-[0.85rem] sm:text-[0.92rem] hover:bg-[#c41c22] transition-colors duration-200 no-underline">Our
                  Services</a><a href="contact/contact.php"
                  class="border border-[#555] text-[#cccccc] px-5 sm:px-7 py-2.5 sm:py-3 rounded-md font-semibold text-[0.85rem] sm:text-[0.92rem] hover:border-[#e32028] hover:text-[#e32028] transition-colors duration-200 no-underline">Get
                  in Touch</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full border border-[#333] bg-black/50 text-[#cccccc] hover:border-[#e32028] hover:text-[#e32028] transition-colors duration-200"
        aria-label="Previous slide">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M13 4l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"></path>
        </svg></button><button
        class="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full border border-[#333] bg-black/50 text-[#cccccc] hover:border-[#e32028] hover:text-[#e32028] transition-colors duration-200"
        aria-label="Next slide">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          </path>
        </svg>
      </button>
      <div class="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 hidden md:flex gap-2.5">
        <button class="rounded-full transition-all duration-300 w-7 h-2 bg-[#e32028]"
          aria-label="Go to slide 1"></button><button class="rounded-full transition-all duration-300 w-2 h-2 bg-[#555]"
          aria-label="Go to slide 2"></button><button class="rounded-full transition-all duration-300 w-2 h-2 bg-[#555]"
          aria-label="Go to slide 3"></button>
      </div>
      <div class="home-hero-mobile-actions absolute bottom-3 left-3 flex gap-2 block md:hidden">
        <a href="services/services.php"
          class="bg-[#e32028] text-white px-3.5 py-1.5 rounded-full font-semibold text-[0.72rem] shadow-md no-underline">Our
          Services</a><a href="contact/contact.php"
          class="bg-black/40 backdrop-blur-sm border border-white/60 text-white px-3.5 py-1.5 rounded-full font-semibold text-[0.72rem] shadow-md no-underline">Get
          in Touch</a>
      </div>
    </template>
    <section class="gb-services-provide relative overflow-hidden bg-[#050505] py-10 sm:py-12">
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(227,32,40,0.13),transparent_62%)]">
      </div>
      <div class="pointer-events-none absolute -bottom-28 left-[-15%] right-[-15%] h-72 opacity-25" style="
            background-image:
              linear-gradient(rgba(227, 32, 40, 0.6) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(227, 32, 40, 0.6) 1px,
                transparent 1px
              );
            background-size: 48px 48px;
            transform: perspective(420px) rotateX(58deg);
            transform-origin: bottom center;
          "></div>
      <div class="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <header class="mb-6 text-center sm:mb-7" style="
              opacity: 0;
              transform: translateY(24px);
              transition:
                opacity 650ms ease,
                transform 650ms ease;
            ">
          <h2 class="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Services We <span class="text-[#e32028]">Provide</span>
          </h2>
        </header>
        <div class="grid gap-3.5 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.6fr)]">
          <a href="services/digital-marketing/digital-marketing.php" aria-label="Digital Marketing"
            class="group relative isolate overflow-hidden rounded-[18px] border border-[#e32028]/65 bg-[#0c0c0c] min-h-[220px] sm:min-h-[360px] lg:min-h-[430px] no-underline"
            style="
                opacity: 0;
                transform: translateY(42px) scale(0.98);
                transition:
                  opacity 700ms ease 0ms,
                  transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1) 0ms;
              "><img src="assets/img/home_services/services1.png"
              alt="Digital marketing strategy and campaign services" loading="eager"
              class="absolute inset-0 h-full w-full object-cover" />
            <div class="absolute inset-0 bg-linear-to-t from-black/95 from-25% via-black/10 to-transparent"></div>
            <div class="absolute inset-0 bg-[#e32028]/0 transition-colors duration-500 group-hover:bg-[#e32028]/8">
            </div>
            <div
              class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#ff3038] to-transparent opacity-30 transition-opacity duration-500 group-hover:opacity-100">
            </div>
            <div class="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
              <div class="flex items-center gap-3">
                <span
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d9151d] text-white shadow-[0_0_24px_rgba(227,32,40,0.35)]"><span
                    class="h-5 w-5"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 19V9m6 10V5m6 14v-7m4 7H3"></path>
                        <path d="m5 9 6-4 6 7 4-4"></path>
                      </g>
                    </svg></span></span>
                <h3
                  class="font-extrabold leading-tight text-white transition-colors duration-300 group-hover:text-[#ff3038] text-2xl sm:text-3xl">
                  Digital Marketing
                </h3>
              </div>
            </div>
          </a>
          <div class="grid gap-3.5 sm:grid-cols-2">
            <a href="services/photography-&amp;-videography/photography-&amp;-videography.php"
              aria-label="Photography &amp; Videography"
              class="group relative isolate overflow-hidden rounded-[18px] border border-[#e32028]/65 bg-[#0c0c0c] min-h-[180px] sm:min-h-[210px] no-underline"
              style="
                  opacity: 0;
                  transform: translateY(42px) scale(0.98);
                  transition:
                    opacity 700ms ease 100ms,
                    transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1) 100ms;
                "><img src="assets/img/Home/services/services1.png"
                alt="Professional photography and videography services" loading="lazy"
                class="absolute inset-0 h-full w-full object-cover" />
              <div class="absolute inset-0 bg-linear-to-t from-black/95 from-30% via-black/15 to-transparent"></div>
              <div class="absolute inset-0 bg-[#e32028]/0 transition-colors duration-500 group-hover:bg-[#e32028]/8">
              </div>
              <div
                class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#ff3038] to-transparent opacity-30 transition-opacity duration-500 group-hover:opacity-100">
              </div>
              <div class="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                <div class="flex items-center gap-3">
                  <span
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d9151d] text-white shadow-[0_0_24px_rgba(227,32,40,0.35)]"><span
                      class="h-5 w-5"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M4 8h4l2-3h4l2 3h4v11H4z"></path>
                          <circle cx="12" cy="13.5" r="3.5"></circle>
                        </g>
                      </svg></span></span>
                  <h3
                    class="font-extrabold leading-tight text-white transition-colors duration-300 group-hover:text-[#ff3038] text-lg sm:text-xl">
                    Photography &amp; Videography
                  </h3>
                </div>
              </div>
            </a><a href="services/branding-&amp;-brand-identity/branding-&amp;-brand-identity.php"
              aria-label="Branding &amp; Identity"
              class="group relative isolate overflow-hidden rounded-[18px] border border-[#e32028]/65 bg-[#0c0c0c] min-h-[180px] sm:min-h-[210px] no-underline"
              style="
                  opacity: 0;
                  transform: translateY(42px) scale(0.98);
                  transition:
                    opacity 700ms ease 200ms,
                    transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1) 200ms;
                "><img src="assets/img/Home/services/services3.png" alt="Branding and brand identity design services"
                loading="lazy" class="absolute inset-0 h-full w-full object-cover" />
              <div class="absolute inset-0 bg-linear-to-t from-black/95 from-30% via-black/15 to-transparent"></div>
              <div class="absolute inset-0 bg-[#e32028]/0 transition-colors duration-500 group-hover:bg-[#e32028]/8">
              </div>
              <div
                class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#ff3038] to-transparent opacity-30 transition-opacity duration-500 group-hover:opacity-100">
              </div>
              <div class="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                <div class="flex items-center gap-3">
                  <span
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d9151d] text-white shadow-[0_0_24px_rgba(227,32,40,0.35)]"><span
                      class="h-5 w-5"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <path d="m5 19 4.5-1 9-9-3.5-3.5-9 9z"></path>
                          <path d="m13.5 7 3.5 3.5M5 19l3-3"></path>
                        </g>
                      </svg></span></span>
                  <h3
                    class="font-extrabold leading-tight text-white transition-colors duration-300 group-hover:text-[#ff3038] text-lg sm:text-xl">
                    Branding &amp; Identity
                  </h3>
                </div>
              </div>
            </a><a href="services/tech-solutions/tech-solutions.php" aria-label="IT &amp; Tech Solutions"
              class="group relative isolate overflow-hidden rounded-[18px] border border-[#e32028]/65 bg-[#0c0c0c] min-h-[180px] sm:min-h-[210px] no-underline"
              style="
                  opacity: 0;
                  transform: translateY(42px) scale(0.98);
                  transition:
                    opacity 700ms ease 300ms,
                    transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1) 300ms;
                "><img src="assets/img/Home/services/services4.png" alt="IT and technology solutions for businesses"
                loading="lazy" class="absolute inset-0 h-full w-full object-cover" />
              <div class="absolute inset-0 bg-linear-to-t from-black/95 from-30% via-black/15 to-transparent"></div>
              <div class="absolute inset-0 bg-[#e32028]/0 transition-colors duration-500 group-hover:bg-[#e32028]/8">
              </div>
              <div
                class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#ff3038] to-transparent opacity-30 transition-opacity duration-500 group-hover:opacity-100">
              </div>
              <div class="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                <div class="flex items-center gap-3">
                  <span
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d9151d] text-white shadow-[0_0_24px_rgba(227,32,40,0.35)]"><span
                      class="h-5 w-5"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <path d="m9 7-5 5 5 5M15 7l5 5-5 5"></path>
                          <path d="m14 4-4 16"></path>
                        </g>
                      </svg></span></span>
                  <h3
                    class="font-extrabold leading-tight text-white transition-colors duration-300 group-hover:text-[#ff3038] text-lg sm:text-xl">
                    IT &amp; Tech Solutions
                  </h3>
                </div>
              </div>
            </a><a href="services/other-services/other-services.php" aria-label="Other Services"
              class="group relative isolate overflow-hidden rounded-[18px] border border-[#e32028]/65 bg-[#0c0c0c] min-h-[180px] sm:min-h-[210px] no-underline"
              style="
                  opacity: 0;
                  transform: translateY(42px) scale(0.98);
                  transition:
                    opacity 700ms ease 400ms,
                    transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1) 400ms;
                "><img src="assets/img/Home/services/services5.png" alt="Other professional business services"
                loading="lazy" class="absolute inset-0 h-full w-full object-cover" />
              <div class="absolute inset-0 bg-linear-to-t from-black/95 from-30% via-black/15 to-transparent"></div>
              <div class="absolute inset-0 bg-[#e32028]/0 transition-colors duration-500 group-hover:bg-[#e32028]/8">
              </div>
              <div
                class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#ff3038] to-transparent opacity-30 transition-opacity duration-500 group-hover:opacity-100">
              </div>
              <div class="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                <div class="flex items-center gap-3">
                  <span
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d9151d] text-white shadow-[0_0_24px_rgba(227,32,40,0.35)]"><span
                      class="h-5 w-5"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="9" cy="9" r="3"></circle>
                          <circle cx="17" cy="10" r="2.5"></circle>
                          <path d="M3 20c.4-4 2.5-6 6-6s5.6 2 6 6M14 15c3.7-.3 6 1.3 7 4"></path>
                        </g>
                      </svg></span></span>
                  <h3
                    class="font-extrabold leading-tight text-white transition-colors duration-300 group-hover:text-[#ff3038] text-lg sm:text-xl">
                    Other Services
                  </h3>
                </div>
              </div>
            </a>
          </div>
        </div>
        <a href="services/services.php"
          class="group relative mt-3.5 flex min-h-20 items-center justify-between overflow-hidden rounded-[18px] border border-[#e32028]/65 bg-[linear-gradient(105deg,#230305,#69090e_55%,#170203)] px-5 py-3 text-white no-underline sm:px-6"
          style="
              opacity: 0;
              transform: translateY(34px);
              transition:
                opacity 700ms ease 520ms,
                transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1) 520ms;
            ">
          <div
            class="absolute inset-0 translate-x-[-110%] bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[110%]">
          </div>
          <div class="relative">
            <p class="text-xl font-black sm:text-2xl">View All Services</p>
          </div>
          <span
            class="relative ml-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#ff3038] text-[#ff3038] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#e32028] group-hover:text-white"><span
              class="h-5 w-5"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                  stroke-linejoin="round"></path>
              </svg></span></span>
        </a>
      </div>
    </section>
    <div>
      <section class="bg-[#111111] py-20">
        <div class="max-w-6xl mx-auto px-4 sm:px-8">
          <div class="text-center mb-14 transition-all duration-700" style="
                opacity: 0;
                transform: translateY(30px);
                transition-delay: 200ms;
              ">
            <div class="flex items-center justify-center gap-3 mb-4">
              <span class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span><span
                class="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Why GoBright</span><span
                class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span>
            </div>
            <h2 class="text-[#e32028] text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Why Choose GoBright
            </h2>
            <p class="text-[#aaaaaa] text-sm max-w-xl mx-auto leading-relaxed">
              Trichy&#x27;s trusted branding &amp; digital marketing partner —
              <span class="text-white font-semibold">GoBright</span> blends
              creativity, strategy, and technology to build brands that drive
              real, measurable business growth.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              class="group bg-[#1a1a1a] rounded-2xl p-8 flex flex-col items-center text-center gap-5 border border-[#2a2a2a] hover:border-[#e32028]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,32,40,0.12)] cursor-pointer"
              style="
                  opacity: 0;
                  transform: translateY(40px);
                  transition:
                    opacity 0.6s ease,
                    transform 0.6s ease,
                    border-color 0.3s,
                    box-shadow 0.3s;
                  transition-delay: 400ms;
                ">
              <div
                class="w-20 h-20 rounded-2xl bg-[#222] border border-[#333] group-hover:border-[#e32028]/40 group-hover:bg-[#e32028]/8 flex items-center justify-center transition-all duration-300 p-3">
                <img src="assets/img/whychoose/icon-1.png" alt="Data-driven branding icon"
                  class="w-full h-full object-contain" />
              </div>
              <h3 class="text-[#e32028] text-base font-bold">
                Data-Driven Branding
              </h3>
              <p class="text-[#888] text-sm leading-relaxed">
                We research Trichy&#x27;s local market, study customer
                behavior, and analyze competitors to build brand strategies
                backed by real insights — not guesswork.
              </p>
            </div>
            <div
              class="group bg-[#1a1a1a] rounded-2xl p-8 flex flex-col items-center text-center gap-5 border border-[#2a2a2a] hover:border-[#e32028]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,32,40,0.12)] cursor-pointer"
              style="
                  opacity: 0;
                  transform: translateY(40px);
                  transition:
                    opacity 0.6s ease,
                    transform 0.6s ease,
                    border-color 0.3s,
                    box-shadow 0.3s;
                  transition-delay: 550ms;
                ">
              <div
                class="w-20 h-20 rounded-2xl bg-[#222] border border-[#333] group-hover:border-[#e32028]/40 group-hover:bg-[#e32028]/8 flex items-center justify-center transition-all duration-300 p-3">
                <img src="assets/img/whychoose/icon-2.png" alt="Performance marketing icon"
                  class="w-full h-full object-contain" />
              </div>
              <h3 class="text-[#e32028] text-base font-bold">
                Performance Marketing
              </h3>
              <p class="text-[#888] text-sm leading-relaxed">
                From Google Ads to Instagram campaigns, our digital marketing
                strategies are engineered to maximize reach, engagement, and
                conversions for your business.
              </p>
            </div>
            <div
              class="group bg-[#1a1a1a] rounded-2xl p-8 flex flex-col items-center text-center gap-5 border border-[#2a2a2a] hover:border-[#e32028]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,32,40,0.12)] cursor-pointer"
              style="
                  opacity: 0;
                  transform: translateY(40px);
                  transition:
                    opacity 0.6s ease,
                    transform 0.6s ease,
                    border-color 0.3s,
                    box-shadow 0.3s;
                  transition-delay: 700ms;
                ">
              <div
                class="w-20 h-20 rounded-2xl bg-[#222] border border-[#333] group-hover:border-[#e32028]/40 group-hover:bg-[#e32028]/8 flex items-center justify-center transition-all duration-300 p-3">
                <img src="assets/img/whychoose/icon-3.png" alt="Business growth analytics icon"
                  class="w-full h-full object-contain" />
              </div>
              <h3 class="text-[#e32028] text-base font-bold">
                Business Growth Analytics
              </h3>
              <p class="text-[#888] text-sm leading-relaxed">
                We track every campaign, measure real business impact, and
                continuously refine your brand strategy to deliver consistent,
                long-term growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="gb-scale-cta" aria-labelledby="gb-scale-cta-title">
        <div class="gb-scale-cta__card">
          <div class="gb-scale-cta__copy">
            <p class="gb-scale-cta__eyebrow">Ready to scale your brand with GoBright?</p>
            <h2 id="gb-scale-cta-title">Let&rsquo;s turn your next idea into <span>a brand people remember.</span></h2>
            <p class="gb-scale-cta__description">From brand strategy and campaigns to websites and automation, work with
              one focused team to turn ambitious ideas into measurable growth.</p>
            <ul class="gb-scale-cta__signals" aria-label="GoBright growth capabilities">
              <li>Brand Strategy</li>
              <li>Digital Growth</li>
              <li>Web &amp; Automation</li>
            </ul>
          </div>
          <a class="gb-scale-cta__button" href="contact/contact.php">
            <span>Start a Project</span>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10h11M11 6l4 4-4 4" />
            </svg>
          </a>
        </div>
      </section>
    </div>
    <section class="gb-clients-strip py-16 border-t border-[#1a1a1a] overflow-hidden">
      <div class="text-center mb-10 transition-all duration-700" style="opacity: 0; transform: translateY(30px)">
        <div class="flex items-center justify-center gap-3 mb-3">
          <span class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span><span
            class="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Trusted By</span><span
            class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span>
        </div>
        <h2 class="text-white text-2xl font-bold">
          Our Esteemed <span class="text-[#e32028]">Clients</span>
        </h2>
      </div>
      <div class="relative transition-all duration-700" style="opacity: 0; transition-delay: 250ms">
        <div class="flex">
          <div class="flex items-center shrink-0" style="animation: clientMarquee 45s linear infinite">
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/sri-venkateswara-textiles-logo.webp"
                alt="Sri Venkateswara Textiles - Mens, Kids & Readymades Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/kwik-ecabs-logo.webp" alt="Kwik eCabs Cab Booking Service Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/ivory-code-logo.webp" alt="Ivory Code Authentic Wear Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/kurunchi-holiday-logo.webp" alt="Kurunchi Holiday Travel Agency Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/prana-rehabilitation-centre-logo.webp" alt="PRANA Rehabilitation Centre Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/buyy-tech-logo.webp" alt="Buyy Tech Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/gskt-logo.webp.webp" alt="GSKT Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/jayaraj-logo.webp" alt="Jayaraj Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/sri-venkateswara-textiles-logo.webp"
                alt="Sri Venkateswara Textiles - Mens, Kids & Readymades Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/kwik-ecabs-logo.webp" alt="Kwik eCabs Cab Booking Service Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/ivory-code-logo.webp" alt="Ivory Code Authentic Wear Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/kurunchi-holiday-logo.webp" alt="Kurunchi Holiday Travel Agency Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/prana-rehabilitation-centre-logo.webp" alt="PRANA Rehabilitation Centre Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/buyy-tech-logo.webp" alt="Buyy Tech Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/gskt-logo.webp.webp" alt="GSKT Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/jayaraj-logo.webp" alt="Jayaraj Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/sri-venkateswara-textiles-logo.webp"
                alt="Sri Venkateswara Textiles - Mens, Kids & Readymades Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/kwik-ecabs-logo.webp" alt="Kwik eCabs Cab Booking Service Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/ivory-code-logo.webp" alt="Ivory Code Authentic Wear Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/kurunchi-holiday-logo.webp" alt="Kurunchi Holiday Travel Agency Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/prana-rehabilitation-centre-logo.webp" alt="PRANA Rehabilitation Centre Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/buyy-tech-logo.webp" alt="Buyy Tech Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/gskt-logo.webp.webp" alt="GSKT Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/jayaraj-logo.webp" alt="Jayaraj Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          <div class="flex items-center shrink-0" style="animation: clientMarquee 45s linear infinite">
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/sri-venkateswara-textiles-logo.webp"
                alt="Sri Venkateswara Textiles - Mens, Kids & Readymades Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/kwik-ecabs-logo.webp" alt="Kwik eCabs Cab Booking Service Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/ivory-code-logo.webp" alt="Ivory Code Authentic Wear Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/gskt-logo.webp.webp" alt="GSKT Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/prana-rehabilitation-centre-logo.webp" alt="PRANA Rehabilitation Centre Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/buyy-tech-logo.webp" alt="Buyy Tech Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/gskt-logo.webp.webp" alt="GSKT Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/jayaraj-logo.webp" alt="Jayaraj Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/jayaraj-logo.webp"
                alt="Sri Venkateswara Textiles - Mens, Kids & Readymades Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/kwik-ecabs-logo.webp" alt="Kwik eCabs Cab Booking Service Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/ivory-code-logo.webp" alt="Ivory Code Authentic Wear Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/gskt-logo.webp.webp" alt="GSKT Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded p-1" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/prana-rehabilitation-centre-logo.webp" alt="PRANA Rehabilitation Centre Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/buyy-tech-logo.webp" alt="Buyy Tech Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/gskt-logo.webp.webp" alt="GSKT Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/jayaraj-logo.webp" alt="Jayaraj Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/sri-venkateswara-textiles-logo.webp"
                alt="Sri Venkateswara Textiles - Mens, Kids & Readymades Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/kwik-ecabs-logo.webp" alt="Kwik eCabs Cab Booking Service Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/ivory-code-logo.webp" alt="Ivory Code Authentic Wear Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/kurunchi-holiday-logo.webp" alt="Kurunchi Holiday Travel Agency Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/prana-rehabilitation-centre-logo.webp" alt="PRANA Rehabilitation Centre Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/buyy-tech-logo.webp" alt="Buyy Tech Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/gskt-logo.webp.webp" alt="GSKT Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              class="gb-client-logo-card border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-[170px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5">
              <img src="assets/img/clients/jayaraj-logo.webp" alt="Jayaraj Company Logo"
                class="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
      <style>
        @keyframes clientMarquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-100%);
          }
        }
      </style>
    </section>
    <section class="relative bg-[#0d0d0d] py-20 border-t border-[#1a1a1a] overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-[#e32028]/5 via-transparent to-[#e32028]/5 pointer-events-none">
      </div>
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(227,32,40,0.08),transparent_65%)] pointer-events-none">
      </div>
      <div class="absolute bottom-0 left-[-20%] right-[-20%] h-[50%] pointer-events-none" style="
            background-image:
              linear-gradient(rgba(227, 32, 40, 0.5) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(227, 32, 40, 0.5) 1px,
                transparent 1px
              );
            background-size: 50px 50px;
            transform: perspective(400px) rotateX(55deg);
            transform-origin: bottom center;
            opacity: 0.45;
          "></div>
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        <div class="text-center mb-14 transition-all duration-700" style="opacity: 0; transform: translateY(30px)">
          <div class="flex items-center justify-center gap-3 mb-4">
            <span class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span><span
              class="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Our Impact</span><span
              class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span>
          </div>
          <h2 class="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            Numbers That <span class="text-[#e32028]">Speak</span>
          </h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          <div
            class="group flex flex-col items-center text-center p-3 sm:p-5 rounded-2xl border border-[#2a2a2a] bg-[#111] hover:border-[#e32028]/50 hover:shadow-[0_0_25px_rgba(227,32,40,0.1)] transition-all duration-300"
            style="
                opacity: 0;
                transform: translateY(40px);
                transition:
                  opacity 0.6s ease,
                  transform 0.6s ease,
                  border-color 0.3s,
                  box-shadow 0.3s;
                transition-delay: 200ms;
              ">
            <span
              class="text-[#e32028] text-2xl sm:text-4xl md:text-5xl font-bold mb-2"><span><?= $homeStatsClientCount ?>+</span></span><span
              class="text-white font-semibold text-sm mb-1">Brands Built</span><span
              class="text-[#666] text-xs leading-relaxed">Unique identities crafted for real businesses</span>
          </div>
          <div
            class="group flex flex-col items-center text-center p-3 sm:p-5 rounded-2xl border border-[#2a2a2a] bg-[#111] hover:border-[#e32028]/50 hover:shadow-[0_0_25px_rgba(227,32,40,0.1)] transition-all duration-300"
            style="
                opacity: 0;
                transform: translateY(40px);
                transition:
                  opacity 0.6s ease,
                  transform 0.6s ease,
                  border-color 0.3s,
                  box-shadow 0.3s;
                transition-delay: 320ms;
              ">
            <span
              class="text-[#e32028] text-2xl sm:text-4xl md:text-5xl font-bold mb-2"><span><?= $homeStatsClientCount ?>+</span></span><span
              class="text-white font-semibold text-sm mb-1">Happy Clients</span><span
              class="text-[#666] text-xs leading-relaxed">Businesses that trust GoBright to grow</span>
          </div>
          <div
            class="group flex flex-col items-center text-center p-3 sm:p-5 rounded-2xl border border-[#2a2a2a] bg-[#111] hover:border-[#e32028]/50 hover:shadow-[0_0_25px_rgba(227,32,40,0.1)] transition-all duration-300"
            style="
                opacity: 0;
                transform: translateY(40px);
                transition:
                  opacity 0.6s ease,
                  transform 0.6s ease,
                  border-color 0.3s,
                  box-shadow 0.3s;
                transition-delay: 440ms;
              ">
            <span
              class="text-[#e32028] text-2xl sm:text-4xl md:text-5xl font-bold mb-2"><span><?= $homeStatsMonths ?></span></span><span
              class="text-white font-semibold text-sm mb-1">Months Experience</span><span
              class="text-[#666] text-xs leading-relaxed">Established Jan 18, 2026 · Trichy, Tamil Nadu</span>
          </div>
          <div
            class="group flex flex-col items-center text-center p-3 sm:p-5 rounded-2xl border border-[#2a2a2a] bg-[#111] hover:border-[#e32028]/50 hover:shadow-[0_0_25px_rgba(227,32,40,0.1)] transition-all duration-300"
            style="
                opacity: 0;
                transform: translateY(40px);
                transition:
                  opacity 0.6s ease,
                  transform 0.6s ease,
                  border-color 0.3s,
                  box-shadow 0.3s;
                transition-delay: 560ms;
              ">
            <span class="text-[#e32028] text-2xl sm:text-4xl md:text-5xl font-bold mb-2"><span>100%</span></span><span
              class="text-white font-semibold text-sm mb-1">Client Satisfaction</span><span
              class="text-[#666] text-xs leading-relaxed">Clients who return &amp; refer us to others</span>
          </div>
        </div>
      </div>
    </section>
    <section class="relative bg-[#111111] py-20 overflow-hidden">
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(227,32,40,0.1),transparent_60%)] pointer-events-none">
      </div>
      <div class="absolute bottom-0 left-[-20%] right-[-20%] h-[50%] pointer-events-none" style="
            background-image:
              linear-gradient(rgba(227, 32, 40, 0.5) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(227, 32, 40, 0.5) 1px,
                transparent 1px
              );
            background-size: 50px 50px;
            transform: perspective(400px) rotateX(55deg);
            transform-origin: bottom center;
            opacity: 0.45;
          "></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-8">
        <div class="text-center mb-16 transition-all duration-700" style="opacity: 0; transform: translateY(30px)">
          <div class="flex items-center justify-center gap-3 mb-4">
            <span class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span><span
              class="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">How We Work</span><span
              class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span>
          </div>
          <h2 class="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Our Creative <span class="text-[#e32028]">Process</span>
          </h2>
          <p class="text-[#666] text-sm max-w-md mx-auto leading-relaxed">
            A proven 5-step process that takes your brand from idea to impact
            - with clarity, creativity, and precision at every stage.
          </p>
        </div>
        <div class="relative">
          <div
            class="hidden md:block absolute top-10 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e32028]/30 to-transparent">
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            <div class="group flex flex-col items-center text-center md:items-center" style="
                  opacity: 0;
                  transform: translateY(40px);
                  transition:
                    opacity 0.6s ease,
                    transform 0.6s ease;
                  transition-delay: 200ms;
                ">
              <div
                class="relative w-20 h-20 rounded-full border-2 border-[#2a2a2a] bg-[#0d0d0d] flex flex-col items-center justify-center mb-5 group-hover:border-[#e32028] group-hover:shadow-[0_0_20px_rgba(227,32,40,0.3)] transition-all duration-300 z-10">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="#e32028" stroke-width="2"></circle>
                  <path d="M18 18l5 5" stroke="#e32028" stroke-width="2" stroke-linecap="round"></path>
                  <path d="M9 12h6M12 9v6" stroke="#e32028" stroke-width="2" stroke-linecap="round"></path>
                </svg><span
                  class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#e32028] text-white text-[0.6rem] font-bold flex items-center justify-center">01</span>
              </div>
              <h3 class="text-white font-bold text-sm mb-2 group-hover:text-[#e32028] transition-colors duration-300">
                Discovery &amp; Strategy
              </h3>
              <p class="text-[#666] text-xs leading-relaxed max-w-full sm:max-w-[200px]">
                We dive deep into your business, audience, competitors, and
                goals. This research-first approach ensures every creative
                decision is backed by real insight - not guesswork.
              </p>
            </div>
            <div class="group flex flex-col items-center text-center md:items-center" style="
                  opacity: 0;
                  transform: translateY(40px);
                  transition:
                    opacity 0.6s ease,
                    transform 0.6s ease;
                  transition-delay: 350ms;
                ">
              <div
                class="relative w-20 h-20 rounded-full border-2 border-[#2a2a2a] bg-[#0d0d0d] flex flex-col items-center justify-center mb-5 group-hover:border-[#e32028] group-hover:shadow-[0_0_20px_rgba(227,32,40,0.3)] transition-all duration-300 z-10">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M4 20L14 6l10 14H4z" stroke="#e32028" stroke-width="2" stroke-linejoin="round"></path>
                  <circle cx="14" cy="12" r="2" fill="#e32028"></circle>
                  <path d="M8 20h12" stroke="#e32028" stroke-width="2" stroke-linecap="round"></path>
                </svg><span
                  class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#e32028] text-white text-[0.6rem] font-bold flex items-center justify-center">02</span>
              </div>
              <h3 class="text-white font-bold text-sm mb-2 group-hover:text-[#e32028] transition-colors duration-300">
                Brand Concept &amp; Design
              </h3>
              <p class="text-[#666] text-xs leading-relaxed max-w-full sm:max-w-[200px]">
                Our designers craft multiple creative directions tailored to
                your brand personality. From logo concepts to full visual
                systems - every pixel has a purpose.
              </p>
            </div>
            <div class="group flex flex-col items-center text-center md:items-center" style="
                  opacity: 0;
                  transform: translateY(40px);
                  transition:
                    opacity 0.6s ease,
                    transform 0.6s ease;
                  transition-delay: 500ms;
                ">
              <div
                class="relative w-20 h-20 rounded-full border-2 border-[#2a2a2a] bg-[#0d0d0d] flex flex-col items-center justify-center mb-5 group-hover:border-[#e32028] group-hover:shadow-[0_0_20px_rgba(227,32,40,0.3)] transition-all duration-300 z-10">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M5 14l6 6L23 8" stroke="#e32028" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"></path>
                  <circle cx="14" cy="14" r="11" stroke="#e32028" stroke-width="2"></circle>
                </svg><span
                  class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#e32028] text-white text-[0.6rem] font-bold flex items-center justify-center">03</span>
              </div>
              <h3 class="text-white font-bold text-sm mb-2 group-hover:text-[#e32028] transition-colors duration-300">
                Review &amp; Refinement
              </h3>
              <p class="text-[#666] text-xs leading-relaxed max-w-full sm:max-w-[200px]">
                We present the concepts, gather your feedback, and refine
                until it&#x27;s perfect. Collaboration is at the heart of
                everything we do - your vision, our craft.
              </p>
            </div>
            <div class="group flex flex-col items-center text-center md:items-center" style="
                  opacity: 0;
                  transform: translateY(40px);
                  transition:
                    opacity 0.6s ease,
                    transform 0.6s ease;
                  transition-delay: 650ms;
                ">
              <div
                class="relative w-20 h-20 rounded-full border-2 border-[#2a2a2a] bg-[#0d0d0d] flex flex-col items-center justify-center mb-5 group-hover:border-[#e32028] group-hover:shadow-[0_0_20px_rgba(227,32,40,0.3)] transition-all duration-300 z-10">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 4v14M14 4l-5 5M14 4l5 5" stroke="#e32028" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"></path>
                  <path d="M5 18v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4" stroke="#e32028" stroke-width="2"
                    stroke-linecap="round"></path>
                </svg><span
                  class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#e32028] text-white text-[0.6rem] font-bold flex items-center justify-center">04</span>
              </div>
              <h3 class="text-white font-bold text-sm mb-2 group-hover:text-[#e32028] transition-colors duration-300">
                Delivery &amp; Launch
              </h3>
              <p class="text-[#666] text-xs leading-relaxed max-w-full sm:max-w-[200px]">
                We deliver all brand assets in every format you need - print,
                digital, social. Complete brand guidelines included so your
                team can maintain consistency going forward.
              </p>
            </div>
            <div class="group flex flex-col items-center text-center md:items-center" style="
                  opacity: 0;
                  transform: translateY(40px);
                  transition:
                    opacity 0.6s ease,
                    transform 0.6s ease;
                  transition-delay: 800ms;
                ">
              <div
                class="relative w-20 h-20 rounded-full border-2 border-[#2a2a2a] bg-[#0d0d0d] flex flex-col items-center justify-center mb-5 group-hover:border-[#e32028] group-hover:shadow-[0_0_20px_rgba(227,32,40,0.3)] transition-all duration-300 z-10">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M4 20l5-5 4 4 5-7 6 8" stroke="#e32028" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"></path>
                  <path d="M20 8l4 0 0 4" stroke="#e32028" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"></path>
                </svg><span
                  class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#e32028] text-white text-[0.6rem] font-bold flex items-center justify-center">05</span>
              </div>
              <h3 class="text-white font-bold text-sm mb-2 group-hover:text-[#e32028] transition-colors duration-300">
                Growth &amp; Support
              </h3>
              <p class="text-[#666] text-xs leading-relaxed max-w-full sm:max-w-[200px]">
                Our relationship doesn&#x27;t end at delivery. We offer
                ongoing support, brand management, and marketing services to
                help your brand grow and evolve over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="relative bg-[#0a0a0a] py-20 overflow-hidden border-t border-[#1a1a1a]">
      <div class="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#e32028]/6 blur-[80px] pointer-events-none">
      </div>
      <div class="absolute bottom-0 left-[-20%] right-[-20%] h-[45%] pointer-events-none" style="
            background-image:
              linear-gradient(rgba(227, 32, 40, 0.5) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(227, 32, 40, 0.5) 1px,
                transparent 1px
              );
            background-size: 50px 50px;
            transform: perspective(400px) rotateX(55deg);
            transform-origin: bottom center;
            opacity: 0.4;
          "></div>
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        <div class="text-center mb-14 transition-all duration-700" style="opacity: 0; transform: translateY(30px)">
          <div class="flex items-center justify-center gap-3 mb-4">
            <span class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span><span
              class="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Client Love</span><span
              class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span>
          </div>
          <h2 class="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            What Our <span class="text-[#e32028]">Clients Say</span>
          </h2>
          <p class="text-[#666] text-sm max-w-md mx-auto">
            Real stories from real businesses that grew with GoBright.
          </p>
        </div>
        <div class="overflow-hidden" style="
              opacity: 0;
              transform: translateY(40px);
              transition:
                opacity 0.7s ease,
                transform 0.7s ease;
              transition-delay: 200ms;
            ">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-300"
            style="opacity: 1; transform: translateX(0)">
            <div class="hidden sm:flex md:hidden flex-col gap-6">
              <div class="bg-[#161616] border rounded-2xl p-6 flex flex-col gap-4 border-[#2a2a2a]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M6 20c0-5.5 3-10 9-12l1.5 2.5C13 12 11.5 14 11 16h4v8H6v-4zm15 0c0-5.5 3-10 9-12l1.5 2.5C28 12 26.5 14 26 16h4v8H21v-4z"
                    fill="#e32028" fill-opacity="0.3"></path>
                </svg>
                <p class="text-[#aaa] text-sm leading-relaxed flex-1">
                  &quot;<!-- -->GoBright completely transformed how our brand
                  is perceived. The team understood our legacy and modernized
                  our identity without losing what makes us unique.
                  Exceptional work from start to finish.<!-- -->&quot;
                </p>
                <div class="flex flex-col gap-1 border-t border-[#2a2a2a] pt-4">
                  <div class="flex gap-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg>
                  </div>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-white font-bold text-sm">Ramesh Kumar</span>
                  </div>
                  <span class="text-[#666] text-xs">Founder, Jayaraj Enterprises</span>
                </div>
              </div>
              <div
                class="bg-[#161616] border rounded-2xl p-6 flex flex-col gap-4 border-[#e32028]/50 shadow-[0_0_25px_rgba(227,32,40,0.12)]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M6 20c0-5.5 3-10 9-12l1.5 2.5C13 12 11.5 14 11 16h4v8H6v-4zm15 0c0-5.5 3-10 9-12l1.5 2.5C28 12 26.5 14 26 16h4v8H21v-4z"
                    fill="#e32028" fill-opacity="0.3"></path>
                </svg>
                <p class="text-[#aaa] text-sm leading-relaxed flex-1">
                  &quot;<!-- -->Working with GoBright was a game-changer for
                  us. Our digital presence went from invisible to impactful
                  within weeks. Their creativity, strategy, and attention to
                  detail is unmatched in Trichy.<!-- -->&quot;
                </p>
                <div class="flex flex-col gap-1 border-t border-[#2a2a2a] pt-4">
                  <div class="flex gap-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg>
                  </div>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-white font-bold text-sm">Priya Nair</span>
                  </div>
                  <span class="text-[#666] text-xs">CEO, Namma Trip</span>
                </div>
              </div>
            </div>
            <div class="hidden sm:block">
              <div class="bg-[#161616] border rounded-2xl p-6 flex flex-col gap-4 border-[#2a2a2a]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M6 20c0-5.5 3-10 9-12l1.5 2.5C13 12 11.5 14 11 16h4v8H6v-4zm15 0c0-5.5 3-10 9-12l1.5 2.5C28 12 26.5 14 26 16h4v8H21v-4z"
                    fill="#e32028" fill-opacity="0.3"></path>
                </svg>
                <p class="text-[#aaa] text-sm leading-relaxed flex-1">
                  &quot;<!-- -->GoBright completely transformed how our brand
                  is perceived. The team understood our legacy and modernized
                  our identity without losing what makes us unique.
                  Exceptional work from start to finish.<!-- -->&quot;
                </p>
                <div class="flex flex-col gap-1 border-t border-[#2a2a2a] pt-4">
                  <div class="flex gap-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg>
                  </div>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-white font-bold text-sm">Ramesh Kumar</span>
                  </div>
                  <span class="text-[#666] text-xs">Founder, Jayaraj Enterprises</span>
                </div>
              </div>
            </div>
            <div class="hidden sm:block">
              <div
                class="bg-[#161616] border rounded-2xl p-6 flex flex-col gap-4 border-[#e32028]/50 shadow-[0_0_25px_rgba(227,32,40,0.12)]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M6 20c0-5.5 3-10 9-12l1.5 2.5C13 12 11.5 14 11 16h4v8H6v-4zm15 0c0-5.5 3-10 9-12l1.5 2.5C28 12 26.5 14 26 16h4v8H21v-4z"
                    fill="#e32028" fill-opacity="0.3"></path>
                </svg>
                <p class="text-[#aaa] text-sm leading-relaxed flex-1">
                  &quot;<!-- -->Working with GoBright was a game-changer for
                  us. Our digital presence went from invisible to impactful
                  within weeks. Their creativity, strategy, and attention to
                  detail is unmatched in Trichy.<!-- -->&quot;
                </p>
                <div class="flex flex-col gap-1 border-t border-[#2a2a2a] pt-4">
                  <div class="flex gap-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg>
                  </div>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-white font-bold text-sm">Priya Nair</span>
                  </div>
                  <span class="text-[#666] text-xs">CEO, Namma Trip</span>
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="bg-[#161616] border rounded-2xl p-6 flex flex-col gap-4 border-[#2a2a2a]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M6 20c0-5.5 3-10 9-12l1.5 2.5C13 12 11.5 14 11 16h4v8H6v-4zm15 0c0-5.5 3-10 9-12l1.5 2.5C28 12 26.5 14 26 16h4v8H21v-4z"
                    fill="#e32028" fill-opacity="0.3"></path>
                </svg>
                <p class="text-[#aaa] text-sm leading-relaxed flex-1">
                  &quot;<!-- -->The GoBright team delivered a brand identity
                  that truly reflects who we are as a tech company. Clean,
                  modern, and powerful. We&#x27;ve received so many
                  compliments from our clients since the rebrand.<!-- -->&quot;
                </p>
                <div class="flex flex-col gap-1 border-t border-[#2a2a2a] pt-4">
                  <div class="flex gap-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg>
                  </div>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-white font-bold text-sm">Arun Selvam</span>
                  </div>
                  <span class="text-[#666] text-xs">Director, Ivory Code</span>
                </div>
              </div>
            </div>
            <div class="sm:hidden">
              <div
                class="bg-[#161616] border rounded-2xl p-6 flex flex-col gap-4 border-[#e32028]/50 shadow-[0_0_25px_rgba(227,32,40,0.12)]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M6 20c0-5.5 3-10 9-12l1.5 2.5C13 12 11.5 14 11 16h4v8H6v-4zm15 0c0-5.5 3-10 9-12l1.5 2.5C28 12 26.5 14 26 16h4v8H21v-4z"
                    fill="#e32028" fill-opacity="0.3"></path>
                </svg>
                <p class="text-[#aaa] text-sm leading-relaxed flex-1">
                  &quot;<!-- -->GoBright completely transformed how our brand
                  is perceived. The team understood our legacy and modernized
                  our identity without losing what makes us unique.
                  Exceptional work from start to finish.<!-- -->&quot;
                </p>
                <div class="flex flex-col gap-1 border-t border-[#2a2a2a] pt-4">
                  <div class="flex gap-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg><svg width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"></path>
                    </svg>
                  </div>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-white font-bold text-sm">Ramesh Kumar</span>
                  </div>
                  <span class="text-[#666] text-xs">Founder, Jayaraj Enterprises</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center gap-5 mt-10">
          <button
            class="w-11 h-11 rounded-full border border-[#333] bg-[#111] flex items-center justify-center text-[#aaa] hover:border-[#e32028] hover:text-[#e32028] hover:shadow-[0_0_15px_rgba(227,32,40,0.3)] transition-all duration-200">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4l-5 5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"></path>
            </svg>
          </button>
          <div class="flex gap-2">
            <button class="rounded-full transition-all duration-300 w-8 h-2 bg-[#e32028]"></button><button
              class="rounded-full transition-all duration-300 w-2 h-2 bg-[#333] hover:bg-[#555]"></button><button
              class="rounded-full transition-all duration-300 w-2 h-2 bg-[#333] hover:bg-[#555]"></button><button
              class="rounded-full transition-all duration-300 w-2 h-2 bg-[#333] hover:bg-[#555]"></button><button
              class="rounded-full transition-all duration-300 w-2 h-2 bg-[#333] hover:bg-[#555]"></button><button
              class="rounded-full transition-all duration-300 w-2 h-2 bg-[#333] hover:bg-[#555]"></button>
          </div>
          <button
            class="w-11 h-11 rounded-full border border-[#333] bg-[#111] flex items-center justify-center text-[#aaa] hover:border-[#e32028] hover:text-[#e32028] hover:shadow-[0_0_15px_rgba(227,32,40,0.3)] transition-all duration-200">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
    <section id="team-section" class="bg-[#0d0d0d] py-14 border-t border-[#1a1a1a] overflow-hidden relative">
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(227,32,40,0.07),transparent_65%)] pointer-events-none">
      </div>
      <div class="absolute bottom-0 left-[-20%] right-[-20%] h-[45%] pointer-events-none" style="
            background-image:
              linear-gradient(rgba(227, 32, 40, 0.5) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(227, 32, 40, 0.5) 1px,
                transparent 1px
              );
            background-size: 50px 50px;
            transform: perspective(400px) rotateX(55deg);
            transform-origin: bottom center;
            opacity: 0.4;
          "></div>
      <div class="absolute left-0 top-0 bottom-0 w-28 pointer-events-none" style="
            background-image: radial-gradient(
              circle,
              rgba(227, 32, 40, 0.35) 1.5px,
              transparent 1.5px
            );
            background-size: 18px 18px;
          "></div>
      <div class="absolute right-0 top-0 bottom-0 w-28 pointer-events-none" style="
            background-image: radial-gradient(
              circle,
              rgba(227, 32, 40, 0.35) 1.5px,
              transparent 1.5px
            );
            background-size: 18px 18px;
          "></div>
      <div class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-10 md:px-16">
        <div class="text-center mb-14 transition-all duration-700" style="opacity: 0; transform: translateY(30px)">
          <div class="flex items-center justify-center gap-3 mb-4">
            <span class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span><span
              class="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">The People</span><span
              class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span>
          </div>
          <h2 class="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            Our <span class="text-[#e32028]">Team</span>
          </h2>
          <p class="text-[#555] text-sm mt-3">
            The passionate people driving GoBright&#x27;s brand growth mission
          </p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          <div class="group" style="
                opacity: 0;
                transform: translateY(40px);
                transition:
                  opacity 0.6s ease 0ms,
                  transform 0.6s ease 0ms;
              ">
            <div
              class="relative rounded-xl overflow-hidden border border-[#2a2a2a] group-hover:border-[#e32028]/60 transition-all duration-400 group-hover:shadow-[0_0_28px_rgba(227,32,40,0.25)]">
              <img src="assets/img/teams/mr-thanga-durai-managing-director-gobright.webp"
                alt="Mr. Thanga Durai, Managing Director of GoBright Digital Marketing Agency in Trichy"
                class="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out" />
              <div
                class="absolute bottom-0 left-0 right-0 h-1 bg-[#e32028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
              </div>
            </div>
            <div class="mt-3 text-center">
              <p class="text-white text-sm font-semibold group-hover:text-[#e32028] transition-colors duration-300">
                Mr. Thanga Durai
              </p>
              <p class="text-[#888] text-xs mt-1">Managing Director (MD)</p>
            </div>
          </div>
          <div class="group" style="
                opacity: 0;
                transform: translateY(40px);
                transition:
                  opacity 0.6s ease 90ms,
                  transform 0.6s ease 90ms;
              ">
            <div
              class="relative rounded-xl overflow-hidden border border-[#2a2a2a] group-hover:border-[#e32028]/60 transition-all duration-400 group-hover:shadow-[0_0_28px_rgba(227,32,40,0.25)]">
              <img src="assets/img/teams/mr-sridhar-executive-director-gobright.webp"
                alt="Mr. Sridhar, Executive Director of GoBright Digital Marketing Agency in Trichy"
                class="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out" />
              <div
                class="absolute bottom-0 left-0 right-0 h-1 bg-[#e32028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
              </div>
            </div>
            <div class="mt-3 text-center">
              <p class="text-white text-sm font-semibold group-hover:text-[#e32028] transition-colors duration-300">
                Mr. Sridhar
              </p>
              <p class="text-[#888] text-xs mt-1">Executive Director (ED)</p>
            </div>
          </div>
          <div class="group" style="
                opacity: 0;
                transform: translateY(40px);
                transition:
                  opacity 0.6s ease 180ms,
                  transform 0.6s ease 180ms;
              ">
            <div
              class="relative rounded-xl overflow-hidden border border-[#2a2a2a] group-hover:border-[#e32028]/60 transition-all duration-400 group-hover:shadow-[0_0_28px_rgba(227,32,40,0.25)]">
              <img src="assets/img/teams/mr-dhayala-prakash-chief-administrative-officer-gobright.webp"
                alt="Mr. Dhayala Prakash, Chief Administrative Officer of GoBright Digital Marketing Agency in Trichy"
                class="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out" />
              <div
                class="absolute bottom-0 left-0 right-0 h-1 bg-[#e32028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
              </div>
            </div>
            <div class="mt-3 text-center">
              <p class="text-white text-sm font-semibold group-hover:text-[#e32028] transition-colors duration-300">
                Mr. Dhayala Prakash
              </p>
              <p class="text-[#888] text-xs mt-1">
                Chief Administrative Officer (CAO)
              </p>
            </div>
          </div>
          <div class="group" style="
                opacity: 0;
                transform: translateY(40px);
                transition:
                  opacity 0.6s ease 270ms,
                  transform 0.6s ease 270ms;
              ">
            <div
              class="relative rounded-xl overflow-hidden border border-[#2a2a2a] group-hover:border-[#e32028]/60 transition-all duration-400 group-hover:shadow-[0_0_28px_rgba(227,32,40,0.25)]">
              <img src="assets/img/teams/mrs-akila-administrative-officer-gobright.webp"
                alt="Mrs. Akila, Administrative Officer of GoBright Digital Marketing Agency in Trichy"
                class="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out" />
              <div
                class="absolute bottom-0 left-0 right-0 h-1 bg-[#e32028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
              </div>
            </div>
            <div class="mt-3 text-center">
              <p class="text-white text-sm font-semibold group-hover:text-[#e32028] transition-colors duration-300">
                Mrs. Akila
              </p>
              <p class="text-[#888] text-xs mt-1">
                Administrative Officer (AO)
              </p>
            </div>
          </div>
          <div class="group" style="
                opacity: 0;
                transform: translateY(40px);
                transition:
                  opacity 0.6s ease 360ms,
                  transform 0.6s ease 360ms;
              ">
            <div
              class="relative rounded-xl overflow-hidden border border-[#2a2a2a] group-hover:border-[#e32028]/60 transition-all duration-400 group-hover:shadow-[0_0_28px_rgba(227,32,40,0.25)]">
              <img src="assets/img/teams/mr-vignesh-senior-it-executive-gobright.webp"
                alt="Mr. Vignesh, Senior IT Executive at GoBright Digital Marketing Agency in Trichy"
                class="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out" />
              <div
                class="absolute bottom-0 left-0 right-0 h-1 bg-[#e32028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
              </div>
            </div>
            <div class="mt-3 text-center">
              <p class="text-white text-sm font-semibold group-hover:text-[#e32028] transition-colors duration-300">
                Mr. Vignesh
              </p>
              <p class="text-[#888] text-xs mt-1">Senior IT Executive</p>
            </div>
          </div>
          <div class="group" style="
                opacity: 0;
                transform: translateY(40px);
                transition:
                  opacity 0.6s ease 450ms,
                  transform 0.6s ease 450ms;
              ">
            <div
              class="relative rounded-xl overflow-hidden border border-[#2a2a2a] group-hover:border-[#e32028]/60 transition-all duration-400 group-hover:shadow-[0_0_28px_rgba(227,32,40,0.25)]">
              <img src="assets/img/teams/mr-praveen-content-creator-gobright.webp"
                alt="Mr. Praveen, Content Creator at GoBright Digital Marketing Agency in Trichy"
                class="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out" />
              <div
                class="absolute bottom-0 left-0 right-0 h-1 bg-[#e32028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
              </div>
            </div>
            <div class="mt-3 text-center">
              <p class="text-white text-sm font-semibold group-hover:text-[#e32028] transition-colors duration-300">
                Mr. Praveen
              </p>
              <p class="text-[#888] text-xs mt-1">Content Creator</p>
            </div>
          </div>
          <div class="group" style="
                opacity: 0;
                transform: translateY(40px);
                transition:
                  opacity 0.6s ease 540ms,
                  transform 0.6s ease 540ms;
              ">
            <div
              class="relative rounded-xl overflow-hidden border border-[#2a2a2a] group-hover:border-[#e32028]/60 transition-all duration-400 group-hover:shadow-[0_0_28px_rgba(227,32,40,0.25)]">
              <img src="assets/img/teams/mr-bala-ganesan-content-creator-gobright.webp"
                alt="Mr. Bala Ganesan, Content Creator at GoBright Digital Marketing Agency in Trichy"
                class="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out" />
              <div
                class="absolute bottom-0 left-0 right-0 h-1 bg-[#e32028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
              </div>
            </div>
            <div class="mt-3 text-center">
              <p class="text-white text-sm font-semibold group-hover:text-[#e32028] transition-colors duration-300">
                Mr. Bala Ganesan
              </p>
              <p class="text-[#888] text-xs mt-1">Content Creator</p>
            </div>
          </div>
          <div class="group" style="
                opacity: 0;
                transform: translateY(40px);
                transition:
                  opacity 0.6s ease 630ms,
                  transform 0.6s ease 630ms;
              ">
            <div
              class="relative rounded-xl overflow-hidden border border-[#2a2a2a] group-hover:border-[#e32028]/60 transition-all duration-400 group-hover:shadow-[0_0_28px_rgba(227,32,40,0.25)]">
              <img src="assets/img/teams/mr-fradrick-full-stack-developer-gobright.webp"
                alt="Mr. Fradrick, Full Stack Developer at GoBright Digital Marketing Agency in Trichy"
                class="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out" />
              <div
                class="absolute bottom-0 left-0 right-0 h-1 bg-[#e32028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
              </div>
            </div>
            <div class="mt-3 text-center">
              <p class="text-white text-sm font-semibold group-hover:text-[#e32028] transition-colors duration-300">
                Mr. Fradrick
              </p>
              <p class="text-[#888] text-xs mt-1">Full Stack Developer</p>
            </div>
          </div>
          <div class="group" style="
                opacity: 0;
                transform: translateY(40px);
                transition:
                  opacity 0.6s ease 720ms,
                  transform 0.6s ease 720ms;
              ">
            <div
              class="relative rounded-xl overflow-hidden border border-[#2a2a2a] group-hover:border-[#e32028]/60 transition-all duration-400 group-hover:shadow-[0_0_28px_rgba(227,32,40,0.25)]">
              <img src="assets/img/teams/mr-anbarasan-full-stack-developer-gobright.webp"
                alt="Mr. Anbarasan, Full Stack Developer at GoBright Digital Marketing Agency in Trichy"
                class="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out" />
              <div
                class="absolute bottom-0 left-0 right-0 h-1 bg-[#e32028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
              </div>
            </div>
            <div class="mt-3 text-center">
              <p class="text-white text-sm font-semibold group-hover:text-[#e32028] transition-colors duration-300">
                Mr. Anbarasan
              </p>
              <p class="text-[#888] text-xs mt-1">Full Stack Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="faq" aria-labelledby="faq-heading" class="relative bg-[#0a0a0a] py-20 overflow-hidden">
      <div class="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#e32028]/8 blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-[#e32028]/6 blur-[100px] pointer-events-none">
      </div>
      <div style="
            position: absolute;
            bottom: 0;
            left: -20%;
            right: -20%;
            height: 55%;
            background-image:
              linear-gradient(rgba(227, 32, 40, 0.6) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(227, 32, 40, 0.6) 1px,
                transparent 1px
              );
            background-size: 50px 50px;
            transform: perspective(400px) rotateX(55deg);
            transform-origin: bottom center;
            opacity: 0.55;
            pointer-events: none;
          "></div>
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        <div class="text-center mb-14 transition-all duration-700" style="opacity: 0; transform: translateY(30px)">
          <div class="flex items-center justify-center gap-3 mb-4">
            <span class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span><span
              class="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">FAQ</span><span
              class="w-12 sm:w-16 h-[2px] bg-[#e32028]"></span>
          </div>
          <h2 id="faq-heading" class="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Frequently Asked <span class="text-[#e32028]">Questions</span>
          </h2>
          <p class="text-[#666] text-sm max-w-md mx-auto leading-relaxed">
            Everything you need to know about branding and working with
            GoBright.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-4">
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 0ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">What
                    is branding and why is it important?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    <span class="text-[#e32028] font-semibold">Branding</span>
                    is the process of creating a strong, unique identity for
                    your business in the minds of your customers. It goes
                    beyond logos and colors - it defines how people feel,
                    think, and trust your brand. Strong branding builds
                    credibility, recognition, emotional connection, and
                    long-term business growth.
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 160ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">What
                    makes GoBright different from other branding
                    companies?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    <span class="text-[#e32028] font-semibold">GoBright</span>
                    is driven by Infinite Imagination. We don&#x27;t follow
                    templates - we create brand identities from scratch,
                    rooted in strategy, creativity, and purpose. Our
                    family-first culture, multi-disciplinary expertise, and
                    obsession with quality help us deliver branding that
                    stands out, connects emotionally, and performs
                    commercially.
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 320ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">What
                    are the key elements of a successful brand?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    <ul class="list-disc list-inside space-y-1.5">
                      <li>Clear brand strategy &amp; positioning</li>
                      <li>Strong logo and visual identity</li>
                      <li>Consistent messaging and tone of voice</li>
                      <li>Emotional connection with the audience</li>
                      <li>Seamless experience across all touchpoints</li>
                      <li class="list-none text-[#666] mt-2">
                        GoBright ensures all these elements work together as
                        one powerful brand system.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 480ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">What
                    does a branding agency like GoBright do?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    As a full-service branding agency,
                    <span class="text-[#e32028] font-semibold">GoBright</span>
                    helps businesses define who they are, how they
                    communicate, and how they are perceived. Our services
                    include brand strategy, logo design, visual identity,
                    digital branding, signage, internal branding, content
                    creation, and complete brand execution across online and
                    offline platforms.
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 640ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">Why
                    do I need a professional branding company?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    Professional branding builds trust, attracts the right
                    customers, and positions your business above competitors.
                    A branding company like GoBright brings strategic
                    thinking, creative expertise, and execution excellence -
                    saving you time, money, and costly trial-and-error.
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 800ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">What
                    types of branding services does GoBright
                    offer?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    <p class="font-semibold text-white mb-2">
                      We offer end-to-end branding solutions including:
                    </p>
                    <ul class="list-disc list-inside space-y-1.5">
                      <li>Brand strategy &amp; consulting</li>
                      <li>Logo &amp; identity design</li>
                      <li>Digital &amp; social media branding</li>
                      <li>Website branding &amp; UI design</li>
                      <li>LED signage, acrylic boards &amp; printing</li>
                      <li>Interior &amp; architectural branding</li>
                      <li>Product, modelling &amp; commercial photoshoots</li>
                      <li>Content creation &amp; brand videos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 960ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">Do
                    you work with clients outside Trichy?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    Yes! While we are based in
                    <span class="text-[#e32028] font-semibold">Trichy, Tamil Nadu</span>, we work with clients across
                    India and internationally.
                    Our digital-first workflow allows us to collaborate
                    seamlessly with brands anywhere in the world.
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 1120ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">Can
                    GoBright redesign my existing brand?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    Absolutely.
                    <span class="text-[#e32028] font-semibold">Brand revamps</span>
                    are one of our specialties. We audit your existing brand,
                    identify gaps, and craft a refreshed identity that retains
                    your brand equity while modernizing your look, feel, and
                    positioning.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 80ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">How
                    long does the branding process take?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    The branding timeline depends on the project scope. A
                    basic brand identity may take 2-4 weeks, while a complete
                    brand transformation can take 6-10 weeks. At GoBright, we
                    focus on quality, clarity, and long-term impact rather
                    than rushing the process.
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 240ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">Do
                    you provide brand guidelines?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    Yes, GoBright provides a comprehensive Brand Guidelines
                    Document that includes logo usage, colors, typography,
                    tone of voice, visual rules, and brand applications. This
                    ensures consistency across all platforms and future brand
                    communication.
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 400ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">What
                    is the difference between branding and
                    marketing?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    Branding defines who you are; marketing communicates that
                    identity to the world. Branding is the foundation, while
                    marketing is the promotion. Without strong branding,
                    marketing efforts become weak and inconsistent. GoBright
                    helps you build both on a solid strategic base.
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 560ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">How
                    do I choose the right branding agency?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    Choose a branding agency that understands your vision,
                    thinks strategically, and creates original work - not
                    generic designs. Look for clarity, creativity, experience,
                    and long-term thinking. GoBright partners with you as a
                    brand-building ally, not just a service provider.
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 720ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">Is
                    GoBright suitable for startups and growing
                    businesses?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    Absolutely. We work with startups, SMEs, and established
                    brands. Whether you&#x27;re launching a new brand or
                    transforming an existing one, GoBright scales its approach
                    to match your business stage and growth goals.
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 880ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">How
                    can I start a branding project with GoBright?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    You can start by contacting us for a brand consultation.
                    We&#x27;ll understand your business, goals, challenges,
                    and vision - then craft a branding solution powered by
                    Infinite Imagination.
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 1040ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">What
                    is the cost of branding services at GoBright?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    Branding investment varies based on scope, complexity, and
                    deliverables. We offer packages for startups, growing
                    businesses, and enterprise brands. Contact us for a
                    customized quote tailored to your specific needs and
                    budget.
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all duration-700" style="
                  opacity: 0;
                  transform: translateY(30px);
                  transition-delay: 1200ms;
                ">
              <div
                class="rounded-xl overflow-hidden border transition-all duration-300 border-[#2a2a2a] hover:border-[#e32028]/30 bg-[#161616]">
                <button class="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group">
                  <span
                    class="text-sm font-semibold leading-snug transition-colors duration-300 text-white group-hover:text-[#e32028]">How
                    does GoBright ensure brand consistency?</span><span
                    class="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 border-[#444] group-hover:border-[#e32028]"><svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg></span>
                </button>
                <div class="transition-all duration-400 overflow-hidden max-h-0 opacity-0">
                  <div class="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
                    We deliver detailed brand guidelines, templates, and asset
                    libraries so your team can apply your brand consistently
                    across every touchpoint - from social media to signage,
                    packaging to presentations.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-14 transition-all duration-700" style="opacity: 0; transition-delay: 800ms">
          <p class="text-[#666] text-sm mb-4">
            Still have questions? We&#x27;re happy to help.
          </p>
          <a href="contact/contact.php"
            class="inline-flex items-center gap-2 bg-[#e32028] text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#c41c22] transition-all duration-200 no-underline shadow-[0_0_20px_rgba(227,32,40,0.3)] hover:shadow-[0_0_30px_rgba(227,32,40,0.5)]">Talk
            to Us<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round"></path>
            </svg></a>
        </div>
      </div>
    </section>
    <section class="gb-data-benchmarks" aria-labelledby="data-benchmarks-title">
      <div class="gb-data-benchmarks__inner">
        <header class="gb-data-benchmarks__header">
          <p class="gb-data-benchmarks__eyebrow">Research-led growth</p>
          <h2 id="data-benchmarks-title">Numbers that shape smarter <span>brand decisions</span></h2>
          <p>Independent research helps us prioritise the experiences that influence visibility, trust, and conversion.
            These figures are industry benchmarks, not GoBright client-performance claims.</p>
        </header>

        <div class="gb-data-benchmarks__grid">
          <article class="gb-data-benchmarks__card">
            <p class="gb-data-benchmarks__value"><data value="53">53%</data></p>
            <h3>Mobile attention is unforgiving</h3>
            <p>Google reports that 53% of mobile visits are likely to be abandoned when a page takes longer than 3
              seconds to load.</p>
            <a href="https://support.google.com/adsense/answer/7450973?hl=en" target="_blank"
              rel="noopener noreferrer">Source: Google research</a>
          </article>

          <article class="gb-data-benchmarks__card">
            <p class="gb-data-benchmarks__value"><data value="76">76%</data></p>
            <h3>Local search drives real action</h3>
            <p>76% of people who search on a smartphone for something nearby visit a business within a day, while 28% of
              those searches result in a purchase.</p>
            <a href="https://www.thinkwithgoogle.com/_qs/documents/620/mobile-search-trends-consumers-to-stores.pdf"
              target="_blank" rel="noopener noreferrer">Source: Google consumer research</a>
          </article>

          <article class="gb-data-benchmarks__card">
            <p class="gb-data-benchmarks__value"><data value="2.5">2.5s</data></p>
            <h3>Performance has clear thresholds</h3>
            <p>Google recommends LCP within 2.5 seconds, INP at 200 milliseconds or less, and a CLS score of 0.1 or less
              for a good web experience.</p>
            <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer">Source: Google Web
              Vitals</a>
          </article>

          <article class="gb-data-benchmarks__card">
            <p class="gb-data-benchmarks__value"><data value="71">71%</data></p>
            <h3>Relevance builds stronger relationships</h3>
            <p>McKinsey found that 71% of consumers expect personalised interactions, 76% feel frustrated without them,
              and 78% say personalised content makes repurchase more likely.</p>
            <a href="https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/the-value-of-getting-personalization-right-or-wrong-is-multiplying/"
              target="_blank" rel="noopener noreferrer">Source: McKinsey research</a>
          </article>
        </div>

        <p class="gb-data-benchmarks__note">Sources reviewed August 2026. Results vary by market, audience, offer, and
          execution.</p>
      </div>
    </section>

    <section class="gb-growth-guide" aria-labelledby="growth-guide-title">
      <div class="gb-growth-guide__inner">
        <header class="gb-growth-guide__header">
          <p class="gb-growth-guide__eyebrow">A practical growth guide</p>
          <h2 id="growth-guide-title">How can the right growth service solve your next business challenge?</h2>
          <p><strong>Short answer:</strong> Match the business problem to the service that removes the main growth
            blocker first. Use this comparison to connect your immediate need with the most relevant GoBright
            capability, typical deliverables, and intended outcome.</p>
        </header>

        <div class="gb-growth-guide__table-wrap" tabindex="0" role="region"
          aria-label="GoBright service comparison table">
          <table class="gb-growth-guide__table">
            <caption>GoBright service selection and business-outcome comparison</caption>
            <thead>
              <tr>
                <th scope="col">Business question</th>
                <th scope="col">Recommended service</th>
                <th scope="col">Typical deliverables</th>
                <th scope="col">Primary outcome</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">How can we become more recognisable?</th>
                <td><a href="services/branding-&amp;-brand-identity/branding-&amp;-brand-identity">Branding &amp; Brand
                    Identity</a></td>
                <td>Positioning, messaging, logo, identity system, and brand guidelines</td>
                <td>A clear, distinctive, and consistent brand</td>
              </tr>
              <tr>
                <th scope="row">How can more qualified buyers find us?</th>
                <td><a href="services/digital-marketing/digital-marketing">Digital Marketing</a></td>
                <td>SEO, content, paid search, social media, and campaign optimisation</td>
                <td>Greater visibility and qualified enquiries</td>
              </tr>
              <tr>
                <th scope="row">How can our website convert better?</th>
                <td><a href="services/tech-solutions/tech-solutions">Web &amp; Technology</a></td>
                <td>UX strategy, responsive development, landing pages, analytics, and lead capture</td>
                <td>A faster journey with clearer conversion paths</td>
              </tr>
              <tr>
                <th scope="row">How can our products look more credible?</th>
                <td><a href="services/photography-&amp;-videography/photography-&amp;-videography">Photography &amp;
                    Videography</a></td>
                <td>Product imagery, corporate films, campaign videos, and social content</td>
                <td>Stronger attention, understanding, and trust</td>
              </tr>
              <tr>
                <th scope="row">How can marketing connect with sales?</th>
                <td><a href="services/tech-solutions/tech-solutions">CRM &amp; Automation</a></td>
                <td>Lead workflows, CRM integration, follow-up automation, and reporting dashboards</td>
                <td>Better hand-offs, follow-up, and measurement</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="gb-growth-guide__qa" aria-label="Growth planning questions and answers">
          <article>
            <h3>What should a growing business improve first?</h3>
            <p><strong>Direct answer:</strong> Start with the constraint that most directly limits growth: unclear
              positioning, weak visibility, low website conversion, inconsistent lead follow-up, or insufficient sales
              content. A focused diagnostic prevents scattered spending.</p>
          </article>
          <article>
            <h3>How do branding and digital marketing work together?</h3>
            <p><strong>Direct answer:</strong> Branding defines who you are, why customers should care, and how you
              should appear. Digital marketing turns that strategy into discoverable content and campaigns that attract,
              educate, and convert the right audience.</p>
          </article>
          <article>
            <h3>Why does website performance affect lead generation?</h3>
            <p><strong>Direct answer:</strong> A fast, mobile-friendly website reduces friction before an enquiry. Clear
              navigation, relevant proof, focused calls to action, and reliable analytics help more visitors understand
              the offer and take the next step.</p>
          </article>
          <article>
            <h3>When should a business invest in CRM and automation?</h3>
            <p><strong>Direct answer:</strong> CRM and automation become valuable when enquiries arrive through multiple
              channels, follow-ups are inconsistent, lead ownership is unclear, or management cannot reliably see
              pipeline status and campaign contribution.</p>
          </article>
          <article>
            <h3>How does GoBright measure marketing progress?</h3>
            <p><strong>Direct answer:</strong> Measurement should follow the objective. We connect channel indicators
              such as visibility, engagement, and cost per lead with business indicators such as qualified enquiries,
              conversion rate, pipeline value, and revenue attribution.</p>
          </article>
          <article>
            <h3>Which GoBright service is right for your business?</h3>
            <p><strong>Direct answer:</strong> The right starting point depends on your current bottleneck, internal
              capability, audience, and growth target. A discovery conversation helps define priorities, scope, success
              measures, and a practical delivery sequence.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-[#0d0d0d] border-t border-[#1a1a1a]">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div class="flex flex-col gap-7">
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="w-10 h-[2px] bg-[#e32028]"></span><span
                class="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Find Us</span>
            </div>
            <h3 class="text-white text-2xl sm:text-3xl font-bold mb-2">
              Visit <span class="text-[#e32028]">GoBright</span>
            </h3>
            <p class="text-[#666] text-sm leading-relaxed max-w-sm">
              We&#x27;re always happy to meet in person. Come visit us or
              reach out through any channel below.
            </p>
          </div>
          <div class="rounded-2xl overflow-hidden border border-[#2a2a2a] w-full h-64 sm:h-72">
            <iframe title="GoBright Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9177165443275!2d78.68266737451772!3d10.817608858433841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5d9bcffb7e7%3A0xb301280f35b47dbf!2sGoBright%20%7C%20Branding%20%26%20Digital%20Marketing%20Agency%2C%20Trichy!5e0!3m2!1sen!2sin!4v1779189812320!5m2!1sen!2sin"
              width="100%" height="100%" style="border: 0; filter: invert(90%) hue-rotate(180deg)" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div>
          <div class="mb-6">
            <div class="flex items-center gap-3 mb-3">
              <span class="w-10 h-[2px] bg-[#e32028]"></span><span
                class="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Get In Touch</span>
            </div>
            <h3 class="text-white text-2xl sm:text-3xl font-bold">
              Send an <span class="text-[#e32028]">Enquiry</span>
            </h3>
          </div>
          <form class="flex flex-col gap-4 rounded-2xl bg-white p-5 sm:p-6 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-[#333] text-xs font-semibold uppercase tracking-wide">Your Name</label><input
                  required="" placeholder="John Doe"
                  class="bg-white border border-[#d8d8d8] rounded-lg px-4 py-2.5 text-[#111] text-sm placeholder-[#8a8a8a] focus:outline-none focus:border-[#e32028] focus:shadow-[0_0_0_3px_rgba(227,32,40,0.12)] transition-all duration-200 w-full"
                  name="name" value="" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[#333] text-xs font-semibold uppercase tracking-wide">Phone</label><input required=""
                  placeholder="+91 98765 43210"
                  class="bg-white border border-[#d8d8d8] rounded-lg px-4 py-2.5 text-[#111] text-sm placeholder-[#8a8a8a] focus:outline-none focus:border-[#e32028] focus:shadow-[0_0_0_3px_rgba(227,32,40,0.12)] transition-all duration-200 w-full"
                  name="phone" value="" />
              </div>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[#333] text-xs font-semibold uppercase tracking-wide">Email</label><input required=""
                type="email" placeholder="john@example.com"
                class="bg-white border border-[#d8d8d8] rounded-lg px-4 py-2.5 text-[#111] text-sm placeholder-[#8a8a8a] focus:outline-none focus:border-[#e32028] focus:shadow-[0_0_0_3px_rgba(227,32,40,0.12)] transition-all duration-200 w-full"
                name="email" value="" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[#333] text-xs font-semibold uppercase tracking-wide">Message</label><textarea
                name="message" rows="4" placeholder="Tell us about your project or requirement..."
                class="bg-white border border-[#d8d8d8] rounded-lg px-4 py-2.5 text-[#111] text-sm placeholder-[#8a8a8a] focus:outline-none focus:border-[#e32028] focus:shadow-[0_0_0_3px_rgba(227,32,40,0.12)] transition-all duration-200 w-full resize-none"></textarea>
            </div>
            <button type="submit"
              class="w-full text-white py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(227,32,40,0.3)] hover:shadow-[0_0_30px_rgba(227,32,40,0.5)] mt-1 bg-[#e32028] hover:bg-[#c41c22]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
    <footer class="bg-[#111111] text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div class="flex flex-col items-start gap-4">
            <img src="assets/img/logo.png" alt="GoBright" class="h-24 w-auto object-contain" />
            <p class="max-w-xs text-sm font-medium leading-6 text-[#aaaaaa]">GoBright helps businesses grow with
              strategic branding, digital marketing, design, and technology solutions.</p>
            <div class="mt-5">
              <p class="text-[#e32028] font-semibold text-[0.95rem] mb-3">
                Stay Connected
              </p>
              <div class="flex items-center gap-3 flex-wrap">
                <a href="https://www.facebook.com/share/1BFxws7tTx/" aria-label="Facebook" target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center w-9 h-9 rounded-full bg-white text-black hover:bg-[#e32028] hover:text-white transition-colors duration-200"><svg
                    viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" style="display: block">
                    <path
                      d="M13 10h3l-.5 3H13v9h-3v-9H8v-3h2V8.5C10 6.6 11.1 5 13.5 5H16v3h-1.5c-.6 0-1.5.3-1.5 1.2V10z">
                    </path>
                  </svg></a><a href="https://www.instagram.com/gobrightglobal?igsh=ZGM5ZnV5ajFxdDFz"
                  aria-label="Instagram" target="_blank" rel="noopener noreferrer"
                  class="flex items-center justify-center w-9 h-9 rounded-full bg-white text-black hover:bg-[#e32028] hover:text-white transition-colors duration-200"><svg
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <circle cx="12" cy="12" r="4"></circle>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle>
                  </svg></a><a href="https://www.linkedin.com/in/gobright-global-15245a3a3/" aria-label="LinkedIn"
                  target="_blank" rel="noopener noreferrer"
                  class="flex items-center justify-center w-9 h-9 rounded-full bg-white text-black hover:bg-[#e32028] hover:text-white transition-colors duration-200"><svg
                    viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                    <path
                      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z">
                    </path>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg></a><a href="https://wa.me/918925550774" aria-label="WhatsApp" target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center w-9 h-9 rounded-full bg-white text-black hover:bg-[#25D366] hover:text-white transition-colors duration-200"><svg
                    viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z">
                    </path>
                  </svg></a>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-7">
            <div class="flex items-center gap-4 text-[#cccccc]">
              <span class="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 shrink-0"><svg
                  viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z">
                  </path>
                </svg></span><span class="flex flex-col gap-1"><a href="tel:+918925550774"
                  class="text-[0.95rem] text-[#cccccc] no-underline hover:text-[#e32028] transition-colors duration-200">+91
                  89255 50774</a><a href="tel:+919500148123"
                  class="text-[0.95rem] text-[#cccccc] no-underline hover:text-[#e32028] transition-colors duration-200">+91
                  95001 48123</a></span>
            </div>
            <div class="flex items-center gap-4 text-[#cccccc]">
              <span class="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 shrink-0"><svg
                  viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z">
                  </path>
                </svg></span><span class="flex flex-col gap-1"><a href="mailto:info.gobrightglobal@gmail.com"
                  class="text-[0.95rem] text-[#cccccc] no-underline hover:text-[#e32028] transition-colors duration-200 break-all">info.gobrightglobal@gmail.com</a><a
                  href="mailto:gobright.growth@gmail.com"
                  class="text-[0.95rem] text-[#cccccc] no-underline hover:text-[#e32028] transition-colors duration-200 break-all">gobright.growth@gmail.com</a></span>
            </div>
            <div class="flex items-start gap-4">
              <span class="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 shrink-0 mt-0.5"><svg
                  viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z">
                  </path>
                </svg></span>
              <a href="https://www.google.com/maps/search/?api=1&query=Paradise%20Towers%20Complex%2C%20No.%2052%2FB%2C%20First%20Floor%2C%20Thennur%20High%20Road%2C%20Tiruchirappalli%2C%20Tamil%20Nadu%20620017"
                target="_blank" rel="noopener noreferrer" class="gb-map-address-link no-underline">
                <address class="not-italic text-[0.95rem] text-[#cccccc] leading-relaxed">
                  Paradise Towers Complex,<br />No. 52/B, First
                  Floor,<br />Thennur High Road, TRICHY - 620017.
                </address>
              </a>
            </div>
          </div>
          <div class="flex flex-col gap-2 lg:pl-8">
            <h3 class="text-white font-bold text-sm uppercase tracking-[0.15em] mb-1 border-b border-[#2a2a2a] pb-2">
              Quick Links
            </h3>
            <a class="text-white font-semibold text-[1rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
              href="./">Home</a><a
              class="text-white font-semibold text-[1rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
              href="services/services.php">Services</a><a
              class="text-white font-semibold text-[1rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
              href="industries/industries.php">Industries</a><a
              class="text-white font-semibold text-[1rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
              href="contact/contact.php">Contact us</a>
            <div class="flex flex-col gap-2">
              <a class="text-white font-semibold text-[1rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
                href="about/about.php">About us</a><a
                class="text-white font-semibold text-[1rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
                href="careers/careers.php">Careers</a><a
                class="text-white font-semibold text-[1rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
                href="admin/index.php">Admin Login</a>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <h3 class="text-white font-bold text-sm uppercase tracking-[0.15em] mb-1 border-b border-[#2a2a2a] pb-2">
              Our Services
            </h3>
            <a class="text-white text-[0.95rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
              href="services/branding-&amp;-brand-identity/branding-&amp;-brand-identity.php">Branding &amp; Brand
              Identity</a><a
              class="text-white text-[0.95rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
              href="services/digital-marketing/digital-marketing.php">Digital Marketing</a><a
              class="text-white text-[0.95rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
              href="services/tech-solutions/tech-solutions.php">Tech Solutions</a><a
              class="text-white text-[0.95rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
              href="services/photography-&amp;-videography/photography-&amp;-videography.php">Photography &amp;
              Videography</a><a
              class="text-white text-[0.95rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
              href="services/other-services/other-services.php">Other Services</a>

          </div>
        </div>
      </div>
      <div class="border-t border-[#2a2a2a] mt-4">
        <div
          class="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-3">
            <p class="text-[#888888] text-sm">
              &copy; 2026 <span class="text-[#e32028]">GoBright</span>. All rights
              reserved.
            </p>
          </div>
          <div class="flex items-center flex-wrap justify-center gap-x-4 gap-y-2">
            <a title=""
              class="text-[#2a2a2a] hover:text-[#555] transition-colors duration-300 no-underline flex-shrink-0"
              aria-label="Admin" href="admin/"><svg class="w-3 h-3" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                </path>
              </svg></a><span class="text-[#222] text-xs">|</span><span class="flex items-center gap-4"><a
                class="text-[#666] text-xs hover:text-[#e32028] transition-colors duration-200 no-underline whitespace-nowrap"
                href="terms-and-conditions/terms-and-conditions.php">Terms &amp; Conditions</a><span
                class="text-[#333] text-xs">|</span></span><span class="flex items-center gap-4"><a
                class="text-[#666] text-xs hover:text-[#e32028] transition-colors duration-200 no-underline whitespace-nowrap"
                href="privacy-policy/privacy-policy.php">Privacy Policy</a><span
                class="text-[#333] text-xs">|</span></span><span class="flex items-center gap-4"><a
                class="text-[#666] text-xs hover:text-[#e32028] transition-colors duration-200 no-underline whitespace-nowrap"
                href="refund-policy/refund-policy.php">Refund Policy</a></span>
          </div>
        </div>
      </div>
    </footer>
    <div class="fixed bottom-6 right-5 z-50 flex flex-col gap-3">
      <a href="https://wa.me/918925550774" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        class="w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:shadow-[0_4px_28px_rgba(37,211,102,0.7)] hover:scale-110 transition-all duration-200"><svg
          width="20" height="20" class="sm:w-[26px] sm:h-[26px]" viewBox="0 0 24 24" fill="white">
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z">
          </path>
        </svg></a>
    </div>
  </div>
  <script src="assets/js/shared.js" defer></script>
  <script src="assets/js/hero.js" defer></script>
  <script src="assets/js/home.js" defer></script>
  <script src="assets/js/faq.js" defer></script>

  <script>window.GB_BASE_URL = <?= json_encode(app_base_url(), JSON_UNESCAPED_SLASHES) ?>; window.GB_CSRF_TOKEN = <?= json_encode(csrf_token()) ?>; window.GB_PAGE_KEY = <?= json_encode($pageKey) ?>;</script>
  <script src="<?= e(url('assets/js/public-backend.js')) ?>" defer></script>
</body>

</html>