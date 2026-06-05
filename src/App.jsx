import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingButtons from "./components/FloatingButtons";
import Hero from "./components/Home/Hero/Hero";
import Services from "./components/Home/Services/Services";
import WhyChoose from "./components/Home/WhyChoose/WhyChoose";
import Clients from "./components/Home/Clients/Clients";
import Stats from "./components/Home/Stats/Stats";
import Process from "./components/Home/Process/Process";
import Testimonials from "./components/Home/Testimonials/Testimonials";
import FAQ from "./components/Home/FAQ/FAQ";
import Team from "./components/Home/Team/Team";
import About from "./components/About/About";
import Careers from "./components/Careers/Careers";
import Contact from "./components/Contact/Contact";
import Branding from "./components/Services/Branding/Branding";
import DigitalMarketing from "./components/Services/DigitalMarketing/DigitalMarketing";
import IT from "./components/Services/IT/IT";
import Photography from "./components/Services/Photography/Photography";
import OtherServices from "./components/Services/others/OtherServices";
import Industries from "./components/Services/Industries/Industries";
import TermsAndConditions from "./components/Legal/TermsAndConditions";
import PrivacyPolicy from "./components/Legal/PrivacyPolicy";
import RefundPolicy from "./components/Legal/RefundPolicy";
import AttendancePage  from "./components/Admin/Attendance/AttendancePage";
import AdminPage       from "./components/Admin/Attendance/AdminPage";
import AdminDashboard  from "./components/Admin/AdminDashboard/AdminDashboard";
import TeamPage        from "./components/Home/Team/TeamPage";

/* --- Admin Dashboard child pages --- */
import Overview          from "./components/Admin/AdminDashboard/Overview";
import TotalEmployees    from "./components/Admin/AdminDashboard/TotalEmployees/TotalEmployees";
import TodayPresent      from "./components/Admin/AdminDashboard/Attendance/TodayPresent";
import TodayAbsent       from "./components/Admin/AdminDashboard/Attendance/TodayAbsent";
import LeaveRequests     from "./components/Admin/AdminDashboard/LeaveRequests/LeaveRequests";
import MonthlyAttendance from "./components/Admin/AdminDashboard/MonthlyAttendance/MonthlyAttendance";
import QuickReportExport from "./components/Admin/AdminDashboard/QuickReportExport/QuickReportExport";
import EmployeeDetail    from "./components/Admin/AdminDashboard/Employee/EmployeeDetail";
import Report            from "./components/Admin/AdminDashboard/Report/Report";

/* --- Employee Management --- */
import EmployeeManagement from "./components/Admin/AdminDashboard/EmployeeManagement/EmployeeManagement";
import EmployeeForm       from "./components/Admin/AdminDashboard/EmployeeManagement/EmployeeForm";
import EmployeeDocuments  from "./components/Admin/AdminDashboard/EmployeeManagement/EmployeeDocuments";

/* --- Attendance Management --- */
import AttendanceManagement    from "./components/Admin/AdminDashboard/AttendanceManagement/AttendanceManagement";
import DailyAttendance         from "./components/Admin/AdminDashboard/AttendanceManagement/DailyAttendance";
import EmployeeWiseAttendance  from "./components/Admin/AdminDashboard/AttendanceManagement/EmployeeWiseAttendance";
import LateComingReport        from "./components/Admin/AdminDashboard/AttendanceManagement/LateComingReport";

/* --- Leave Management --- */
import LeaveManagement from "./components/Admin/AdminDashboard/LeaveManagement/LeaveManagement";
import LeaveHistory    from "./components/Admin/AdminDashboard/LeaveManagement/LeaveHistory";
import LeaveBalance    from "./components/Admin/AdminDashboard/LeaveManagement/LeaveBalance";

/* --- Reports --- */
import Reports        from "./components/Admin/AdminDashboard/Reports/Reports";
import DailyReport    from "./components/Admin/AdminDashboard/Reports/DailyReport";
import MonthlyReport  from "./components/Admin/AdminDashboard/Reports/MonthlyReport";
import EmployeeReport from "./components/Admin/AdminDashboard/Reports/EmployeeReport";
import LeaveReport    from "./components/Admin/AdminDashboard/Reports/LeaveReport";
import SalaryReport   from "./components/Admin/AdminDashboard/Reports/SalaryReport";

/* --- Salary / Payroll --- */
import Salary           from "./components/Admin/AdminDashboard/Salary/Salary";
import GeneratePayslip  from "./components/Admin/AdminDashboard/Salary/GeneratePayslip";
import SalaryHistory    from "./components/Admin/AdminDashboard/Salary/SalaryHistory";

/* --- Website Content --- */
import ClientsManagement from "./components/Admin/AdminDashboard/Website/ClientsManagement";
import ReviewsManagement from "./components/Admin/AdminDashboard/Website/ReviewsManagement";
import WebsiteTeam       from "./components/Admin/AdminDashboard/Website/WebsiteTeam";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <FloatingButtons />
    </>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChoose />
      <Clients />
      <Stats />
      <Process />
      <Testimonials />
      <Team />
      <FAQ />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* -- Public pages (with Header/Footer) -- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Branding />} />
          <Route path="/services/branding-&-brand-identity" element={<Branding />} />
          <Route path="/services/branding-&-identity" element={<Branding />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/services/tech-solutions" element={<IT />} />
          <Route path="/services/photography-&-videography" element={<Photography />} />
          <Route path="/services/other-services" element={<OtherServices />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Route>

        {/* -- Standalone pages (no header/footer) -- */}
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/admin"      element={<AdminPage />} />
        <Route path="/team"       element={<TeamPage />} />

        {/* -- Admin Dashboard (nested routes) -- */}
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          {/* Overview */}
          <Route index                            element={<Overview />} />

          {/* Legacy / Dashboard section */}
          <Route path="total-employees"           element={<TotalEmployees />} />
          <Route path="attendance/present"        element={<TodayPresent />} />
          <Route path="attendance/absent"         element={<TodayAbsent />} />
          <Route path="leave-requests"            element={<LeaveRequests />} />
          <Route path="monthly-attendance"        element={<MonthlyAttendance />} />
          <Route path="export"                    element={<QuickReportExport />} />
          <Route path="report"                    element={<Report />} />
          <Route path="employee/:employeeId"      element={<EmployeeDetail />} />

          {/* Employee Management */}
          <Route path="employee-management"                          element={<EmployeeManagement />} />
          <Route path="employee-management/add"                      element={<EmployeeForm />} />
          <Route path="employee-management/edit/:employeeId"         element={<EmployeeForm />} />
          <Route path="employee-management/documents/:employeeId"    element={<EmployeeDocuments />} />

          {/* Attendance Management */}
          <Route path="attendance-management"                element={<AttendanceManagement />} />
          <Route path="attendance-management/daily"          element={<DailyAttendance />} />
          <Route path="attendance-management/employee-wise"  element={<EmployeeWiseAttendance />} />
          <Route path="attendance-management/late-coming"    element={<LateComingReport />} />

          {/* Leave Management */}
          <Route path="leave-management"            element={<LeaveManagement />} />
          <Route path="leave-management/history"    element={<LeaveHistory />} />
          <Route path="leave-management/balance"    element={<LeaveBalance />} />

          {/* Reports */}
          <Route path="reports"           element={<Reports />} />
          <Route path="reports/daily"     element={<DailyReport />} />
          <Route path="reports/monthly"   element={<MonthlyReport />} />
          <Route path="reports/employee"  element={<EmployeeReport />} />
          <Route path="reports/leave"     element={<LeaveReport />} />
          <Route path="reports/salary"    element={<SalaryReport />} />

          {/* Salary / Payroll */}
          <Route path="salary"                   element={<Salary />} />
          <Route path="salary/generate-payslip"  element={<GeneratePayslip />} />
          <Route path="salary/history"           element={<SalaryHistory />} />

          {/* Website Content */}
          <Route path="website/clients"  element={<ClientsManagement />} />
          <Route path="website/reviews"  element={<ReviewsManagement />} />
          <Route path="website/team"     element={<WebsiteTeam />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
