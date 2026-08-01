<?php
declare(strict_types=1);

final class Database
{
    private const DEFAULT_DB_NAME = 'u381702250_GoBright';
    private const DEFAULT_DB_USER = 'u381702250_GoBright1';
    private const DEFAULT_DB_PASSWORD = 'GoBright@123';

    private static ?PDO $pdo = null;

    public static function connection(): PDO
    {
        if (self::$pdo instanceof PDO) {
            return self::$pdo;
        }

        self::$pdo = self::databaseConnection(self::databaseName());
        self::migrate(self::$pdo);
        self::seed(self::$pdo);

        return self::$pdo;
    }

    private static function databaseConnection(string $database): PDO
    {
        $lastError = null;

        foreach (self::connectionConfigs() as $config) {
            try {
                return self::mysqlConnection($database, $config);
            } catch (PDOException $e) {
                $lastError = $e;
                if (!self::isUnknownDatabase($e)) {
                    continue;
                }
            }

            try {
                $server = self::mysqlConnection(null, $config);
                $server->exec(
                    'CREATE DATABASE IF NOT EXISTS `' . $database . '` ' .
                    'CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
                );

                return self::mysqlConnection($database, $config);
            } catch (PDOException $e) {
                $lastError = $e;
            }
        }

        throw $lastError ?? new RuntimeException('Unable to connect to the database.');
    }

    /**
     * @param array{host:string,port:string,socket:string,user:string,password:string} $config
     */
    private static function mysqlConnection(?string $database, array $config): PDO
    {
        $dsn = $config['socket'] !== ''
            ? 'mysql:unix_socket=' . $config['socket'] . ($database ? ';dbname=' . $database : '') . ';charset=utf8mb4'
            : 'mysql:host=' . $config['host'] . ';port=' . $config['port'] . ($database ? ';dbname=' . $database : '') . ';charset=utf8mb4';

        $pdo = new PDO($dsn, $config['user'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        $pdo->exec("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");

        return $pdo;
    }

    /**
     * @return list<array{host:string,port:string,socket:string,user:string,password:string}>
     */
    private static function connectionConfigs(): array
    {
        $configs = [
            [
                'host' => self::env('DB_HOST', '127.0.0.1'),
                'port' => self::env('DB_PORT', '3306'),
                'socket' => self::env('DB_SOCKET', ''),
                'user' => self::env('DB_USER', self::DEFAULT_DB_USER),
                'password' => self::env('DB_PASSWORD', self::env('DB_PASS', self::DEFAULT_DB_PASSWORD)),
            ],
            [
                'host' => 'localhost',
                'port' => '3306',
                'socket' => '',
                'user' => self::DEFAULT_DB_USER,
                'password' => self::DEFAULT_DB_PASSWORD,
            ],
            [
                'host' => '127.0.0.1',
                'port' => '3306',
                'socket' => '',
                'user' => 'root',
                'password' => '',
            ],
            [
                'host' => 'localhost',
                'port' => '3306',
                'socket' => '',
                'user' => 'root',
                'password' => '',
            ],
        ];

        $unique = [];
        foreach ($configs as $config) {
            $key = implode("\0", $config);
            $unique[$key] = $config;
        }

        return array_values($unique);
    }

    private static function isUnknownDatabase(PDOException $e): bool
    {
        return (int) ($e->errorInfo[1] ?? 0) === 1049 || stripos($e->getMessage(), 'Unknown database') !== false;
    }

    private static function databaseName(): string
    {
        $database = self::env('DB_NAME', self::DEFAULT_DB_NAME);
        if (!preg_match('/^[A-Za-z0-9_]+$/', $database)) {
            throw new RuntimeException('Invalid database name. Use letters, numbers, and underscores only.');
        }

        return $database;
    }

    private static function env(string $key, string $default): string
    {
        $value = getenv($key);
        return is_string($value) && $value !== '' ? $value : $default;
    }

    private static function migrate(PDO $pdo): void
    {
        $statements = [
            <<<'SQL'
CREATE TABLE IF NOT EXISTS admins (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(150) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY admins_username_unique (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
SQL,
            <<<'SQL'
CREATE TABLE IF NOT EXISTS clients (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(190) NOT NULL,
  image LONGTEXT NOT NULL,
  website VARCHAR(255) NOT NULL DEFAULT '',
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
SQL,
            <<<'SQL'
CREATE TABLE IF NOT EXISTS reviews (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(190) NOT NULL,
  role VARCHAR(190) NOT NULL DEFAULT '',
  photo LONGTEXT NOT NULL,
  rating TINYINT UNSIGNED NOT NULL DEFAULT 5,
  review_text TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT reviews_rating_check CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
SQL,
            <<<'SQL'
CREATE TABLE IF NOT EXISTS employees (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  employee_code VARCHAR(60) NOT NULL,
  name VARCHAR(190) NOT NULL,
  role VARCHAR(190) NOT NULL,
  expertise VARCHAR(255) NOT NULL DEFAULT '',
  photo LONGTEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY employees_code_unique (employee_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
SQL,
            <<<'SQL'
CREATE TABLE IF NOT EXISTS jobs (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(190) NOT NULL,
  employment_type VARCHAR(80) NOT NULL DEFAULT 'Full-time',
  experience VARCHAR(120) NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
SQL,
            <<<'SQL'
CREATE TABLE IF NOT EXISTS leads (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(190) NOT NULL,
  phone VARCHAR(60) NOT NULL,
  email VARCHAR(190) NOT NULL,
  service VARCHAR(190) NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  source_page VARCHAR(255) NOT NULL DEFAULT '',
  extra_data TEXT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
SQL,
            <<<'SQL'
CREATE TABLE IF NOT EXISTS career_applications (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  job_id INT UNSIGNED NULL,
  name VARCHAR(190) NOT NULL,
  phone VARCHAR(60) NOT NULL,
  email VARCHAR(190) NOT NULL,
  position VARCHAR(190) NOT NULL,
  experience VARCHAR(120) NOT NULL DEFAULT '',
  portfolio_url VARCHAR(255) NOT NULL DEFAULT '',
  resume_path VARCHAR(255) NOT NULL DEFAULT '',
  resume_name VARCHAR(255) NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  source_page VARCHAR(255) NOT NULL DEFAULT '',
  extra_data TEXT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY career_applications_job_id_index (job_id),
  CONSTRAINT career_applications_job_fk FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
SQL,
        ];

        foreach ($statements as $statement) {
            $pdo->exec($statement);
        }

        if (!self::columnExists($pdo, 'leads', 'source_page')) {
            $pdo->exec("ALTER TABLE leads ADD COLUMN source_page VARCHAR(255) NOT NULL DEFAULT '' AFTER message");
        }
        if (!self::columnExists($pdo, 'leads', 'extra_data')) {
            $pdo->exec("ALTER TABLE leads ADD COLUMN extra_data TEXT NULL AFTER source_page");
        }
        if (!self::columnExists($pdo, 'career_applications', 'source_page')) {
            $pdo->exec("ALTER TABLE career_applications ADD COLUMN source_page VARCHAR(255) NOT NULL DEFAULT '' AFTER message");
        }
        if (!self::columnExists($pdo, 'career_applications', 'extra_data')) {
            $pdo->exec("ALTER TABLE career_applications ADD COLUMN extra_data TEXT NULL AFTER source_page");
        }
        if (!self::columnExists($pdo, 'career_applications', 'resume_path')) {
            $pdo->exec("ALTER TABLE career_applications ADD COLUMN resume_path VARCHAR(255) NOT NULL DEFAULT '' AFTER portfolio_url");
        }
        if (!self::columnExists($pdo, 'career_applications', 'resume_name')) {
            $pdo->exec("ALTER TABLE career_applications ADD COLUMN resume_name VARCHAR(255) NOT NULL DEFAULT '' AFTER resume_path");
        }
    }

    private static function columnExists(PDO $pdo, string $table, string $column): bool
    {
        $stmt = $pdo->prepare(
            'SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?'
        );
        $stmt->execute([$table, $column]);

        return (int) $stmt->fetchColumn() > 0;
    }

    private static function seed(PDO $pdo): void
    {
        $pdo->beginTransaction();
        try {
            self::importLegacySqlite($pdo);

            if ((int) $pdo->query('SELECT COUNT(*) FROM admins')->fetchColumn() === 0) {
                $stmt = $pdo->prepare('INSERT INTO admins (username,password_hash,display_name) VALUES (?,?,?)');
                $stmt->execute(['gobright_admin', password_hash('GoBright@2026', PASSWORD_DEFAULT), 'Website Admin']);
            }

            self::seedRows($pdo, 'clients', ['name','image','website','status'], [
                ['Sri Venkateswara Textiles','assets/img/clients/sri-venkateswara-textiles-logo.webp','','active'],
                ['Kwik eCabs','assets/img/clients/kwik-ecabs-logo.webp','','active'],
                ['Ivory Code','assets/img/clients/ivory-code-logo.webp','','active'],
                ['Kurunchi Holiday','assets/img/clients/kurunchi-holiday-logo.webp','','active'],
                ['Prana Rehabilitation Centre','assets/img/clients/prana-rehabilitation-centre-logo.webp','','active'],
            ]);
            self::ensureDefaultClients($pdo);
            self::seedRows($pdo, 'reviews', ['name','role','photo','rating','review_text','status'], [
                ['Arun Kumar','Founder, AK Foods','',5,'GoBright gave our brand a clear identity and a stronger digital presence.','active'],
                ['Priya S','Marketing Manager','',5,'The team is responsive, creative and focused on measurable business growth.','active'],
                ['Mohamed Irfan','Retail Entrepreneur','',5,'Our campaigns improved quickly and the reporting was easy to understand.','active'],
                ['Nivetha R','Clinic Administrator','',5,'A dependable partner for our website, content and local marketing.','active'],
                ['Karthik Raj','Startup Founder','',4,'Professional execution from strategy through launch.','active'],
            ]);
            self::seedRows($pdo, 'employees', ['employee_code','name','role','expertise','photo','status'], [
                ['GB2026001','Mr. Thanga Durai','Managing Director (MD)','Business strategy and brand growth','assets/img/teams/mr-thanga-durai-managing-director-gobright.webp','active'],
                ['GB2026002','Mr. Sridhar','Executive Director (ED)','Operations and client success','assets/img/teams/mr-sridhar-executive-director-gobright.webp','active'],
                ['GB2026003','Mr. Dhayala Prakash','Chief Administrative Officer (CAO)','Administration leadership and operations','assets/img/teams/mr-dhayala-prakash-chief-administrative-officer-gobright.webp','active'],
                ['GB2026004','Mrs. Akila','Administrative Officer (AO)','Administration and coordination','assets/img/teams/mrs-akila-administrative-officer-gobright.webp','active'],
                ['GB2026005','Mr. Vignesh','Senior IT Executive','Web technology and infrastructure','assets/img/teams/mr-vignesh-senior-it-executive-gobright.webp','active'],
                ['GB2026006','Mr. Praveen','Content Creator','Content strategy and production','assets/img/teams/mr-praveen-content-creator-gobright.webp','active'],
                ['GB2026007','Mr. Bala Ganesan','Content Creator','Content creation and production','assets/img/teams/mr-bala-ganesan-content-creator-gobright.webp','active'],
                ['GB2026008','Mr. Fradrick','Full Stack Developer','Full-stack web development','assets/img/teams/mr-fradrick-full-stack-developer-gobright.webp','active'],
                ['GB2026009','Mr. Anbarasan','Full Stack Developer','Full-stack web development','assets/img/teams/mr-anbarasan-full-stack-developer-gobright.webp','active'],
            ]);
            self::seedRows($pdo, 'jobs', ['title','employment_type','experience','description','requirements','status'], [
                ['Digital Marketing Executive','Full-time','1-3 years','Plan and optimise multi-channel campaigns.','SEO|Google Ads|Meta Ads|Analytics','active'],
                ['Graphic Designer','Full-time','1-3 years','Create strong visual systems for digital and print.','Adobe Creative Suite|Typography|Branding','active'],
                ['PHP Developer','Full-time','2+ years','Build secure, maintainable web applications.','PHP|SQL|JavaScript|REST APIs','active'],
                ['Content Writer','Full-time','1+ year','Write clear search-friendly brand content.','English writing|SEO basics|Research','active'],
                ['Video Editor','Internship','Fresher','Edit social and campaign video content.','Premiere Pro|Storytelling|Motion basics','active'],
            ]);
            self::seedRows($pdo, 'leads', ['name','phone','email','service','message','status'], [
                ['Demo Lead One','9876500001','lead1@example.com','Branding','Need a complete identity for a new business.','new'],
                ['Demo Lead Two','9876500002','lead2@example.com','Digital Marketing','Looking for lead generation support.','contacted'],
                ['Demo Lead Three','9876500003','lead3@example.com','Web Development','Need a fast company website.','new'],
                ['Demo Lead Four','9876500004','lead4@example.com','SEO','Want to improve local search visibility.','qualified'],
                ['Demo Lead Five','9876500005','lead5@example.com','Photography','Need a product photography quotation.','closed'],
            ]);
            self::seedRows($pdo, 'career_applications', ['name','phone','email','position','experience','portfolio_url','message','status'], [
                ['Demo Applicant One','9000000001','candidate1@example.com','Digital Marketing Executive','2 years','','Available to join in 30 days.','new'],
                ['Demo Applicant Two','9000000002','candidate2@example.com','Graphic Designer','1 year','https://example.com/portfolio','Portfolio shared for review.','shortlisted'],
                ['Demo Applicant Three','9000000003','candidate3@example.com','PHP Developer','3 years','https://github.com/example','Experienced with PHP and SQLite.','new'],
                ['Demo Applicant Four','9000000004','candidate4@example.com','Content Writer','Fresher','','Interested in brand content.','reviewed'],
                ['Demo Applicant Five','9000000005','candidate5@example.com','Video Editor','1 year','https://example.com/reel','Reel available at the link.','rejected'],
            ]);
            $pdo->commit();
        } catch (Throwable $e) {
            $pdo->rollBack();
            throw $e;
        }
    }

    private static function importLegacySqlite(PDO $pdo): void
    {
        $path = APP_ROOT . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'gobright.sqlite';
        if (!is_file($path) || !extension_loaded('pdo_sqlite')) {
            return;
        }

        try {
            $legacy = new PDO('sqlite:' . $path, null, null, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        } catch (Throwable) {
            return;
        }

        $tables = [
            'admins' => ['id','username','password_hash','display_name','created_at'],
            'clients' => ['id','name','image','website','status','created_at'],
            'reviews' => ['id','name','role','photo','rating','review_text','status','created_at'],
            'jobs' => ['id','title','employment_type','experience','description','requirements','status','created_at'],
            'leads' => ['id','name','phone','email','service','message','status','created_at'],
            'career_applications' => ['id','job_id','name','phone','email','position','experience','portfolio_url','message','status','created_at'],
        ];

        foreach ($tables as $table => $columns) {
            if ((int) $pdo->query('SELECT COUNT(*) FROM ' . $table)->fetchColumn() !== 0) {
                continue;
            }
            if (!self::legacyTableExists($legacy, $table)) {
                continue;
            }

            $rows = $legacy->query('SELECT ' . implode(',', $columns) . ' FROM ' . $table . ' ORDER BY id')->fetchAll();
            if (!$rows) {
                continue;
            }

            $placeholders = implode(',', array_fill(0, count($columns), '?'));
            $stmt = $pdo->prepare('INSERT INTO ' . $table . ' (' . implode(',', $columns) . ') VALUES (' . $placeholders . ')');
            foreach ($rows as $row) {
                $stmt->execute(array_map(static fn(string $column) => $row[$column] ?? null, $columns));
            }
        }
    }

    private static function legacyTableExists(PDO $legacy, string $table): bool
    {
        $stmt = $legacy->prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=? LIMIT 1");
        $stmt->execute([$table]);

        return (bool) $stmt->fetchColumn();
    }

    private static function seedRows(PDO $pdo, string $table, array $columns, array $rows): void
    {
        if ((int) $pdo->query('SELECT COUNT(*) FROM ' . $table)->fetchColumn() !== 0) {
            return;
        }
        $placeholders = implode(',', array_fill(0, count($columns), '?'));
        $stmt = $pdo->prepare('INSERT INTO ' . $table . ' (' . implode(',', $columns) . ') VALUES (' . $placeholders . ')');
        foreach ($rows as $row) {
            $stmt->execute($row);
        }
    }

    /**
     * Keep the default website/admin client list at 10 rows, even when an older
     * database was already seeded with fewer clients.
     */
    private static function ensureDefaultClients(PDO $pdo): void
    {
        $defaults = [
            ['Sri Venkateswara Textiles','assets/img/clients/sri-venkateswara-textiles-logo.webp','','active'],
            ['Kwik eCabs','assets/img/clients/kwik-ecabs-logo.webp','','active'],
            ['Ivory Code','assets/img/clients/ivory-code-logo.webp','','active'],
            ['Kurunchi Holiday','assets/img/clients/kurunchi-holiday-logo.webp','','active'],
            ['Prana Rehabilitation Centre','assets/img/clients/prana-rehabilitation-centre-logo.webp','','active'],
            ['Buyy Tech','assets/img/clients/buyy-tech-logo.webp','','active'],
            ['GSKT Company','assets/img/clients/gskt-logo.webp.webp','','active'],
            ['Jayaraj Company','assets/img/clients/jayaraj-logo.webp','','active'],
            ['Featured Client 9','clients/clients6.png','','active'],
            ['Featured Client 10','clients/clients7.png','','active'],
        ];

        $cleanup = $pdo->prepare("DELETE FROM clients WHERE name = ? AND image LIKE 'data:image/%'");
        $cleanup->execute(['Test']);

        $existingNames = array_flip($pdo->query('SELECT name FROM clients')->fetchAll(PDO::FETCH_COLUMN));
        $existingCount = (int) $pdo->query('SELECT COUNT(*) FROM clients')->fetchColumn();
        $stmt = $pdo->prepare('INSERT INTO clients(name,image,website,status) VALUES (?,?,?,?)');
        foreach ($defaults as $row) {
            if ($existingCount >= 10) {
                break;
            }
            if (isset($existingNames[$row[0]])) {
                continue;
            }
            $stmt->execute($row);
            $existingNames[$row[0]] = true;
            $existingCount++;
        }
    }
}
