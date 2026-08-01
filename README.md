# GoBright PHP Website

The original exported HTML markup and visual design are retained without redesign. Matching PHP pages add the database/backend connection only. Open the project through Apache/XAMPP; the first request automatically creates the MySQL database `gobright`, installs all tables, and inserts demo records for every admin section.

## Local URL

`http://localhost/GB/GoBright/`

## Admin

`http://localhost/GB/GoBright/admin/`

- Admin ID: `gobright_admin`
- Initial password: `GoBright@2026`

## Main features

- Original `.html` source pages preserved alongside matching `.php` pages
- MySQL database `gobright` with automatic migration and seed data
- Server-side admin login, password hashing, sessions and CSRF protection
- CRUD management for clients, reviews, employees and job openings
- Contact leads and career applications stored in the database
- Public team, jobs, clients and reviews connected without replacing the original Tailwind design

The `storage` directory must be writable by PHP for sessions. MySQL defaults are `127.0.0.1`, user `root`, and an empty password for XAMPP; set `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` to override them.
