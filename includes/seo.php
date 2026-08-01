<?php
declare(strict_types=1);

/** Page-specific metadata used to replace the duplicated exported head. */
function site_seo_pages(): array
{
    return [
        'home' => ['path' => '/index', 'title' => 'Branding & Digital Marketing Agency in Trichy | GoBright', 'description' => 'GoBright is a branding and digital marketing agency in Trichy helping businesses grow through brand strategy, SEO, paid media, web and creative services.', 'label' => 'Home', 'type' => 'WebPage'],
        'about' => ['path' => '/about/about', 'title' => 'About GoBright | Branding & Digital Marketing Team', 'description' => 'Meet GoBright, a Trichy-based team combining brand strategy, creative design, digital marketing and technology to build businesses ready for growth.', 'label' => 'About GoBright', 'type' => 'AboutPage'],
        'careers' => ['path' => '/careers/careers', 'title' => 'Careers at GoBright | Creative & Digital Jobs in Trichy', 'description' => 'Explore careers at GoBright in Trichy and join a collaborative team building brands, campaigns, websites and digital products with measurable impact.', 'label' => 'Careers', 'type' => 'CollectionPage'],
        'contact' => ['path' => '/contact/contact', 'title' => 'Contact GoBright | Digital Marketing Agency in Trichy', 'description' => 'Contact GoBright in Trichy for branding, SEO, paid campaigns, website development, photography and technology solutions. Get a response within 24 hours.', 'label' => 'Contact GoBright', 'type' => 'ContactPage'],
        'industries' => ['path' => '/industries/industries', 'title' => 'Industries We Serve in Trichy | GoBright', 'description' => 'See how GoBright supports healthcare, education, retail, hospitality, real estate, technology and other industries with tailored branding and digital growth.', 'label' => 'Industries', 'type' => 'CollectionPage'],
        'privacy-policy' => ['path' => '/privacy-policy/privacy-policy', 'title' => 'Privacy Policy | GoBright', 'description' => 'Read how GoBright collects, uses, protects and manages personal information submitted through our website, contact forms and business services.', 'label' => 'Privacy Policy', 'type' => 'WebPage'],
        'refund-policy' => ['path' => '/refund-policy/refund-policy', 'title' => 'Refund Policy | GoBright', 'description' => 'Review GoBright\'s refund and cancellation terms for branding, digital marketing, design, development and other professional services.', 'label' => 'Refund Policy', 'type' => 'WebPage'],
        'services' => ['path' => '/services/services', 'title' => 'Brand Strategy & Positioning Services in Trichy | GoBright', 'description' => 'Build a clear, memorable brand with GoBright\'s research, positioning, messaging, identity and rollout services for startups and growing businesses in Trichy.', 'label' => 'Services', 'type' => 'CollectionPage'],
        'branding' => ['path' => '/services/branding-&-brand-identity/branding-&-brand-identity', 'title' => 'Brand Identity & Logo Design Agency in Trichy | GoBright', 'description' => 'Build a brand with GoBright\'s strategy, logo design, visual identity, packaging, print collateral, rebranding and brand guideline services in Trichy.', 'label' => 'Branding & Brand Identity', 'type' => 'WebPage', 'service' => 'Branding and Brand Identity'],
        'digital-marketing' => ['path' => '/services/digital-marketing/digital-marketing', 'title' => 'Digital Marketing & SEO Agency in Trichy | GoBright', 'description' => 'Grow with GoBright\'s digital marketing services in Trichy, including SEO, Google Ads, Meta Ads, social media, content, websites and marketing automation.', 'label' => 'Digital Marketing', 'type' => 'WebPage', 'service' => 'Digital Marketing'],
        'tech-solutions' => ['path' => '/services/tech-solutions/tech-solutions', 'title' => 'IT & Software Development Company in Trichy | GoBright', 'description' => 'GoBright develops websites, business software, CRM, billing, payroll and automation solutions for growing companies in Trichy and across India.', 'label' => 'Tech Solutions', 'type' => 'WebPage', 'service' => 'IT and Software Development'],
        'photography-videography' => ['path' => '/services/photography-&-videography/photography-&-videography', 'title' => 'Commercial Photography & Video in Trichy | GoBright', 'description' => 'Create campaign-ready product, corporate and commercial photography and videography with creative direction, editing and marketing support in Trichy.', 'label' => 'Photography & Videography', 'type' => 'WebPage', 'service' => 'Commercial Photography and Videography'],
        'other-services' => ['path' => '/services/other-services/other-services', 'title' => 'Access Control & Business Support in Trichy | GoBright', 'description' => 'Discover GoBright\'s access control, CCTV, networking, printing, signage and practical business support services for organizations in and around Trichy.', 'label' => 'Other Services', 'type' => 'WebPage', 'service' => 'Access Control and Business Support'],
        'team' => ['path' => '/team/team', 'title' => 'Meet the GoBright Team | Branding & Digital Experts', 'description' => 'Meet the strategists, designers, marketers, developers and creators behind GoBright\'s branding, digital campaigns and technology solutions in Trichy.', 'label' => 'Our Team', 'type' => 'ProfilePage'],
        'terms-and-conditions' => ['path' => '/terms-and-conditions/terms-and-conditions', 'title' => 'Terms & Conditions | GoBright', 'description' => 'Review the terms governing use of the GoBright website and our branding, marketing, creative, development and technology services.', 'label' => 'Terms & Conditions', 'type' => 'WebPage'],
    ];
}

/** Fifteen high-intent local keywords shared by metadata and Article schema. */
function site_seo_target_keywords(): array
{
    return [
        'branding agency Trichy',
        'digital marketing agency Trichy',
        'advertising agency Trichy',
        'logo design company Trichy',
        'brand identity design Trichy',
        'SEO services Trichy',
        'social media marketing Trichy',
        'performance marketing agency Trichy',
        'Google Ads agency Trichy',
        'Meta Ads agency Trichy',
        'web design company Trichy',
        'website development company Trichy',
        'graphic design company Trichy',
        'packaging design company Trichy',
        'lead generation services Trichy',
    ];
}

/** Replace legacy PHP page links in rendered HTML with canonical page-name routes. */
function site_clean_public_links(string $html): string
{
    $html = str_replace(
        [
            'about/about.php',
            'careers/careers.php',
            'contact/contact.php',
            'industries/industries.php',
            'privacy-policy/privacy-policy.php',
            'refund-policy/refund-policy.php',
            'team/team.php',
            'terms-and-conditions/terms-and-conditions.php',
            'services/services.php',
            'services/branding-&amp;-brand-identity/branding-&amp;-brand-identity.php',
            'services/branding-&-brand-identity/branding-&-brand-identity.php',
            'services/branding-&amp;-identity/branding-&amp;-identity.php',
            'services/branding-&-identity/branding-&-identity.php',
            'services/digital-marketing/digital-marketing.php',
            'services/other-services/other-services.php',
            'services/photography-&amp;-videography/photography-&amp;-videography.php',
            'services/photography-&-videography/photography-&-videography.php',
            'services/tech-solutions/tech-solutions.php',
            'admin/index.php',
        ],
        [
            'about/about',
            'careers/careers',
            'contact/contact',
            'industries/industries',
            'privacy-policy/privacy-policy',
            'refund-policy/refund-policy',
            'team/team',
            'terms-and-conditions/terms-and-conditions',
            'services/services',
            'services/branding-&amp;-brand-identity/branding-&amp;-brand-identity',
            'services/branding-&-brand-identity/branding-&-brand-identity',
            'services/branding-&amp;-brand-identity/branding-&amp;-brand-identity',
            'services/branding-&-brand-identity/branding-&-brand-identity',
            'services/digital-marketing/digital-marketing',
            'services/other-services/other-services',
            'services/photography-&amp;-videography/photography-&amp;-videography',
            'services/photography-&-videography/photography-&-videography',
            'services/tech-solutions/tech-solutions',
            'admin/index',
        ],
        $html
    );

    $html = (string) preg_replace_callback(
        '#(<a\b[^>]*\bhref=["\'])((?:\.\./)+|\./)(["\'])#i',
        static fn(array $match): string => $match[1] . $match[2] . 'index' . $match[3],
        $html
    );

    return (string) preg_replace_callback(
        '#(<a\b[^>]*\bhref=["\'])((?:\.\./|\./|/)*admin/)(["\'])#i',
        static fn(array $match): string => $match[1] . $match[2] . 'index' . $match[3],
        $html
    );
}

function site_seo_request_key(): ?string
{
    $script = strtolower(str_replace('\\', '/', (string) ($_SERVER['SCRIPT_NAME'] ?? '')));
    $uriPath = strtolower((string) parse_url((string) ($_SERVER['REQUEST_URI'] ?? ''), PHP_URL_PATH));
    $request = $script . ' ' . $uriPath;
    $routes = [
        'services/branding-&-brand-identity' => 'branding',
        'services/branding-&-identity' => 'branding',
        'services/digital-marketing' => 'digital-marketing',
        'services/tech-solutions' => 'tech-solutions',
        'services/photography-&-videography' => 'photography-videography',
        'services/other-services' => 'other-services',
        'terms-and-conditions' => 'terms-and-conditions',
        'privacy-policy' => 'privacy-policy',
        'refund-policy' => 'refund-policy',
        '/industries' => 'industries', '/careers' => 'careers',
        '/contact' => 'contact', '/about' => 'about', '/team' => 'team',
        '/services' => 'services',
    ];
    foreach ($routes as $needle => $key) {
        if (str_contains($request, $needle)) {
            return $key;
        }
    }
    if (str_contains($request, '/admin/') || str_contains($request, '/api/')) {
        return null;
    }
    return ($GLOBALS['pageKey'] ?? null) === 'home' ? 'home' : null;
}

function site_seo_extract_faq(string $html): array
{
    if (!class_exists(DOMDocument::class)) {
        return [];
    }
    $sectionStart = stripos($html, '<section id="faq"');
    if ($sectionStart === false) {
        return [];
    }
    $sectionEnd = stripos($html, '</section>', $sectionStart);
    if ($sectionEnd === false) {
        return [];
    }
    $sectionHtml = substr($html, $sectionStart, $sectionEnd + strlen('</section>') - $sectionStart);
    $document = new DOMDocument();
    $previousLibxmlState = libxml_use_internal_errors(true);
    $loaded = $document->loadHTML($sectionHtml, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();
    libxml_use_internal_errors($previousLibxmlState);
    if (!$loaded) {
        return [];
    }
    $xpath = new DOMXPath($document);
    $items = [];
    foreach ($xpath->query('//button') ?: [] as $button) {
        $answer = $button->nextElementSibling;
        if (!$answer instanceof DOMElement) {
            continue;
        }
        $questionText = trim((string) preg_replace('/\s+/', ' ', $button->textContent));
        $answerText = trim((string) preg_replace('/\s+/', ' ', $answer->textContent));
        if ($questionText !== '' && $answerText !== '') {
            $items[] = ['question' => $questionText, 'answer' => $answerText];
        }
    }
    return $items;
}

function site_seo_graph(array $page, array $faqItems = []): array
{
    $base = 'https://www.gobrightglobal.com';
    $url = $base . $page['path'];
    $organizationId = $base . '/#organization';
    $websiteId = $base . '/#website';
    $authorId = $base . '/team/team#anbarasan';
    $imageUrl = $base . '/assets/img/Banner/gobright-digital-marketing-agency-trichy-hero-banner.png';
    $organization = [
        '@type' => ['Organization', 'LocalBusiness', 'ProfessionalService'],
        '@id' => $organizationId,
        'name' => 'GoBright',
        'alternateName' => 'GoBright Global',
        'url' => $base . '/',
        'logo' => ['@type' => 'ImageObject', 'url' => $base . '/website_favicon.png'],
        'image' => $imageUrl,
        'description' => 'GoBright is a branding, digital marketing and technology agency based in Tiruchirappalli, Tamil Nadu.',
        'telephone' => ['+918925550774', '+919500148123'],
        'email' => 'info.gobrightglobal@gmail.com',
        'priceRange' => '₹₹',
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => 'No. 52/B, First Floor, Paradise Towers, Thennur High Road',
            'addressLocality' => 'Tiruchirappalli',
            'addressRegion' => 'Tamil Nadu',
            'postalCode' => '620017',
            'addressCountry' => 'IN',
        ],
        'geo' => ['@type' => 'GeoCoordinates', 'latitude' => 10.8176088584, 'longitude' => 78.6826673745],
        'areaServed' => [
            ['@type' => 'City', 'name' => 'Tiruchirappalli'],
            ['@type' => 'State', 'name' => 'Tamil Nadu'],
            ['@type' => 'Country', 'name' => 'India'],
        ],
        'sameAs' => [
            'https://www.facebook.com/share/1BFxws7tTx/',
            'https://www.instagram.com/gobrightglobal',
            'https://www.linkedin.com/in/gobright-global-15245a3a3/',
        ],
        'openingHoursSpecification' => [[
            '@type' => 'OpeningHoursSpecification',
            'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens' => '09:00', 'closes' => '18:00',
        ]],
        'aggregateRating' => ['@type' => 'AggregateRating', 'ratingValue' => 4.9, 'bestRating' => 5, 'reviewCount' => 47],
    ];
    $website = [
        '@type' => 'WebSite', '@id' => $websiteId, 'url' => $base . '/',
        'name' => 'GoBright', 'inLanguage' => 'en-IN',
        'publisher' => ['@id' => $organizationId],
    ];
    $author = [
        '@type' => 'Person', '@id' => $authorId, 'name' => 'GoBright Anbarasan',
        'jobTitle' => 'Full Stack Developer',
        'worksFor' => ['@id' => $organizationId], 'url' => $base . '/team/team',
    ];
    $breadcrumbItems = [[
        '@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => $base . '/',
    ]];
    if (str_starts_with($page['path'], '/services/') && $page['path'] !== '/services/services') {
        $breadcrumbItems[] = [
            '@type' => 'ListItem', 'position' => 2,
            'name' => 'Services', 'item' => $base . '/services/services',
        ];
    }
    if ($page['path'] !== '/index') {
        $breadcrumbItems[] = [
            '@type' => 'ListItem', 'position' => count($breadcrumbItems) + 1,
            'name' => $page['label'], 'item' => $url,
        ];
    }
    $breadcrumbId = $url . '#breadcrumb';
    $breadcrumb = [
        '@type' => 'BreadcrumbList', '@id' => $breadcrumbId,
        'itemListElement' => $breadcrumbItems,
    ];
    $webpage = [
        '@type' => $page['type'],
        '@id' => $url . '#webpage',
        'url' => $url,
        'name' => $page['title'],
        'description' => $page['description'],
        'inLanguage' => 'en-IN',
        'isPartOf' => ['@id' => $websiteId],
        'about' => ['@id' => $organizationId],
        'author' => ['@id' => $authorId],
        'publisher' => ['@id' => $authorId],
        'breadcrumb' => ['@id' => $breadcrumbId],
        'datePublished' => '2026-01-18',
        'dateModified' => '2026-08-01',
        'primaryImageOfPage' => [
            '@type' => 'ImageObject',
            'url' => $imageUrl,
        ],
    ];
    $graph = [$organization, $website, $author, $breadcrumb, $webpage];
    if (!empty($page['service'])) {
        $graph[] = [
            '@type' => 'Service', '@id' => $url . '#service',
            'name' => $page['service'], 'description' => $page['description'],
            'url' => $url, 'provider' => ['@id' => $organizationId],
            'areaServed' => ['Trichy', 'Tamil Nadu', 'India'],
            'audience' => ['@type' => 'BusinessAudience', 'audienceType' => 'Startups, SMEs and growing businesses'],
        ];
        $graph[4]['mainEntity'] = ['@id' => $url . '#service'];
    }
    $articleExcludedPaths = ['/careers/careers', '/contact/contact', '/privacy-policy/privacy-policy', '/refund-policy/refund-policy', '/team/team', '/terms-and-conditions/terms-and-conditions'];
    if (!in_array($page['path'], $articleExcludedPaths, true)) {
        $articleId = $url . '#article';
        $graph[] = [
            '@type' => 'Article',
            '@id' => $articleId,
            'url' => $url,
            'headline' => $page['title'],
            'description' => $page['description'],
            'abstract' => $page['description'],
            'articleSection' => $page['service'] ?? $page['label'],
            'keywords' => implode(', ', site_seo_target_keywords()),
            'inLanguage' => 'en-IN',
            'isAccessibleForFree' => true,
            'mainEntityOfPage' => ['@id' => $url . '#webpage'],
            'isPartOf' => ['@id' => $websiteId],
            'about' => ['@id' => $organizationId],
            'author' => ['@id' => $authorId],
            'publisher' => ['@id' => $authorId],
            'datePublished' => '2026-01-18',
            'dateModified' => '2026-08-01',
            'image' => [
                '@type' => 'ImageObject',
                'url' => $imageUrl,
                'width' => 1942,
                'height' => 809,
            ],
            'thumbnailUrl' => $imageUrl,
        ];
        $graph[4]['subjectOf'] = ['@id' => $articleId];
    }
    if ($page['path'] === '/index') {
        if ($faqItems === []) {
            $faqItems = [
                ['question' => 'What is branding and why is it important?', 'answer' => 'Branding is the process of creating a distinct identity and perception for a business. Strong branding builds recognition, trust, emotional connection and long-term growth.'],
                ['question' => 'What does a branding agency like GoBright do?', 'answer' => 'GoBright helps businesses define how they look, communicate and are perceived through brand strategy, logo and visual identity, digital branding, signage, content and online and offline execution.'],
                ['question' => 'Do you work with clients outside Trichy?', 'answer' => 'Yes. GoBright is based in Trichy and works with clients across India and internationally through a digital-first collaboration workflow.'],
                ['question' => 'Can GoBright redesign my existing brand?', 'answer' => 'Yes. GoBright audits the existing brand, identifies gaps and creates a refreshed identity that retains useful brand equity while modernizing its look, feel and positioning.'],
            ];
        }
        $faqId = $url . '#faq';
        $graph[] = [
            '@type' => 'FAQPage', '@id' => $faqId, 'url' => $url . '#faq',
            'isPartOf' => ['@id' => $url . '#webpage'],
            'mainEntity' => array_map(static fn(array $item): array => [
                '@type' => 'Question',
                'name' => $item['question'],
                'acceptedAnswer' => ['@type' => 'Answer', 'text' => $item['answer']],
            ], $faqItems),
        ];
        $graph[4]['mainEntity'] = ['@id' => $faqId];
    }
    return ['@context' => 'https://schema.org', '@graph' => $graph];
}

function site_seo_transform(string $html): string
{
    if (stripos($html, '<!doctype html') === false || stripos($html, '<head') === false) {
        return $html;
    }
    $html = site_clean_public_links($html);
    if (stripos($html, 'fonts.googleapis.com/css2?family=Montserrat') === false) {
        $fontLinks = "\n    " . '<link rel="preconnect" href="https://fonts.googleapis.com">'
            . "\n    " . '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
            . "\n    " . '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&amp;family=Poppins:wght@400;500;600;700;800&amp;family=Rajdhani:wght@700&amp;display=swap">' . "\n";
        $html = (string) preg_replace('#<head([^>]*)>#i', '<head$1>' . $fontLinks, $html, 1);
    }
    $key = site_seo_request_key();
    $pages = site_seo_pages();
    if ($key === null || !isset($pages[$key])) {
        return $html;
    }
    $page = $pages[$key];
    $canonical = 'https://www.gobrightglobal.com' . $page['path'];
    $canonicalAttr = htmlspecialchars($canonical, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $image = 'https://www.gobrightglobal.com/assets/img/Banner/gobright-digital-marketing-agency-trichy-hero-banner.png';
    $title = htmlspecialchars($page['title'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $description = htmlspecialchars($page['description'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $keywords = htmlspecialchars(implode(', ', site_seo_target_keywords()), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $replacements = [
        '#<title>.*?</title>#is' => '<title>' . $title . '</title>',
        '#<meta\s+name=["\']title["\'][^>]*>#i' => '<meta name="title" content="' . $title . '">',
        '#<meta\s+name=["\']description["\'][^>]*>#i' => '<meta name="description" content="' . $description . '">',
        '#<meta\s+name=["\']keywords["\'][^>]*>#i' => '<meta name="keywords" content="' . $keywords . '">',
        '#<link\s+rel=["\']canonical["\'][^>]*>#i' => '<link rel="canonical" href="' . $canonicalAttr . '">',
        '#<meta\s+property=["\']og:type["\'][^>]*>#i' => '<meta property="og:type" content="website">',
        '#<meta\s+property=["\']og:url["\'][^>]*>#i' => '<meta property="og:url" content="' . $canonicalAttr . '">',
        '#<meta\s+property=["\']og:title["\'][^>]*>#i' => '<meta property="og:title" content="' . $title . '">',
        '#<meta\s+property=["\']og:description["\'][^>]*>#i' => '<meta property="og:description" content="' . $description . '">',
        '#<meta\s+property=["\']og:image["\'][^>]*>#i' => '<meta property="og:image" content="' . $image . '">',
        '#<meta\s+name=["\']twitter:url["\'][^>]*>#i' => '<meta name="twitter:url" content="' . $canonicalAttr . '">',
        '#<meta\s+name=["\']twitter:title["\'][^>]*>#i' => '<meta name="twitter:title" content="' . $title . '">',
        '#<meta\s+name=["\']twitter:description["\'][^>]*>#i' => '<meta name="twitter:description" content="' . $description . '">',
        '#<meta\s+name=["\']twitter:image["\'][^>]*>#i' => '<meta name="twitter:image" content="' . $image . '">',
        '#<link\s+rel=["\']alternate["\']\s+hreflang=["\']en-IN["\'][^>]*>#i' => '<link rel="alternate" hreflang="en-IN" href="' . $canonicalAttr . '">',
        '#<link\s+rel=["\']alternate["\']\s+hreflang=["\']x-default["\'][^>]*>#i' => '<link rel="alternate" hreflang="x-default" href="' . $canonicalAttr . '">',
    ];
    foreach ($replacements as $pattern => $replacement) {
        $html = (string) preg_replace($pattern, $replacement, $html, 1);
    }
    $html = (string) preg_replace('#\s*<script\s+type=["\']application/ld\+json["\']>.*?</script>#is', '', $html);
    $faqItems = $key === 'home' ? site_seo_extract_faq($html) : [];
    $json = json_encode(site_seo_graph($page, $faqItems), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_HEX_TAG);
    $schema = "\n    <script type=\"application/ld+json\">\n" . $json . "\n    </script>\n";
    return (string) preg_replace('#</head>#i', $schema . '</head>', $html, 1);
}

function start_site_seo_output(): void
{
    ob_start('site_seo_transform');
}
