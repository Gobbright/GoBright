<?php
require_once dirname(__DIR__) . '/app/bootstrap.php';
require_admin();
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GoBright Admin | Google Reviews</title>
  <link rel="icon" type="image/png" href="../website_favicon.png">
  <link rel="stylesheet" href="../assets/css/admin.css">
  <link rel="stylesheet" href="../assets/css/responsive.css">
</head>
<body>
  <div class="admin-layout">

    <aside class="sidebar">
      <div class="sidebar-logo">
        <img src="../assets/img/logo.png" alt="GoBright">
      </div>
      <p class="sidebar-label">ADMIN PANEL</p>
      <nav class="sidebar-nav">
        <a href="overview" class="nav-item" data-page="overview">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          Overview
        </a>
        <a href="clients" class="nav-item" data-page="clients">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20M9 21V9"/></svg>
          Clients
        </a>
        <a href="reviews" class="nav-item" data-page="reviews">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Google Reviews
        </a>
        <a href="employees" class="nav-item" data-page="employees">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Employees
        </a>
        <a href="hiring" class="nav-item" data-page="hiring">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          Hiring
        </a>
        <a href="careers" class="nav-item" data-page="careers">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Careers Data
        </a>
        <a href="leads" class="nav-item" data-page="leads">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Lead Form Data
        </a>
      </nav>
      <div class="sidebar-footer">
        <button id="logoutBtn" class="sign-out-btn" type="button">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sign Out
        </button>
      </div>
    </aside>

    <div class="main-wrap">

      <header class="main-header">
        <button class="mobile-menu-btn" type="button">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>        <div>
          <h1 class="dashboard-title">Google Reviews</h1>
        </div>
        <div class="header-right">
          <span class="online-badge">&#9679; System Online</span>
          <div class="user-avatar">WA</div>
        </div>
      </header>

      <section class="section active" id="section-reviews">
        <div class="page-header">
          <div>
            <p class="page-header-label">ADMIN PANEL</p>
            <h2 class="page-header-title">Google Reviews</h2>
            <p class="page-header-sub">Manage customer reviews shown on the website</p>
          </div>
          <button class="btn-add" id="addReviewBtn" type="button">+ Add Review</button>
        </div>
        <div class="panel-box">
          <div class="sub-panel-head">
            <span class="sub-panel-title">All Reviews</span>
            <span class="item-count" id="reviewsCount">0</span>
          </div>
          <div class="reviews-list" id="reviewsList"></div>
        </div>
      </section>

    </div>
  </div>

  <!-- ── Add / Edit Review Modal ── -->
  <div class="modal-overlay hidden" id="reviewModal">
    <div class="modal review-modal">
      <div class="modal-head">
        <h3 id="reviewModalTitle">Add Review</h3>
        <button class="modal-close-circle" id="closeReviewModal" type="button">&#10005;</button>
      </div>
      <div class="modal-body">
        <div class="form-row-2">
          <div class="field">
            <label for="reviewName">REVIEWER NAME <span class="req">*</span></label>
            <input id="reviewName" type="text" placeholder="e.g. Ramesh Kumar">
          </div>
          <div class="field">
            <label for="reviewRole">ROLE / COMPANY</label>
            <input id="reviewRole" type="text" placeholder="e.g. CEO, Namma Trip">
          </div>
        </div>
        <div class="form-row-2">
          <div class="field">
            <label for="reviewPhotoInput">REVIEWER PHOTO</label>
            <label class="upload-area review-photo-upload" for="reviewPhotoInput">
              <input id="reviewPhotoInput" class="upload-input" type="file" accept="image/png,image/jpeg,image/webp,image/gif">
              <div id="reviewPhotoPlaceholder" class="upload-placeholder">
                <p>Click to upload reviewer photo</p>
                <p class="upload-hint">PNG, JPG, WEBP or GIF</p>
              </div>
              <img id="reviewPhotoPreview" class="image-preview review-photo-preview hidden" alt="Reviewer photo preview">
            </label>
          </div>
          <div class="field">
            <label>RATING</label>
            <div class="star-row">
              <div class="star-selector" id="starSelector">
                <button class="star-btn" data-val="1" type="button">★</button>
                <button class="star-btn" data-val="2" type="button">★</button>
                <button class="star-btn" data-val="3" type="button">★</button>
                <button class="star-btn" data-val="4" type="button">★</button>
                <button class="star-btn" data-val="5" type="button">★</button>
              </div>
              <span class="star-count" id="starCount">5 / 5</span>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="reviewText">REVIEW TEXT <span class="req">*</span></label>
          <textarea id="reviewText" rows="5" placeholder="Write the customer review here..."></textarea>
        </div>
      </div>
      <div class="modal-footer-review">
        <button class="btn-save-review" id="saveReviewBtn"   type="button">Add Review</button>
        <button class="btn-cancel-review" id="cancelReviewBtn" type="button">Cancel</button>
      </div>
    </div>
  </div>

  <script>window.GB_BASE_URL=<?= json_encode(app_base_url(), JSON_UNESCAPED_SLASHES) ?>;window.GB_CSRF_TOKEN=<?= json_encode(csrf_token()) ?>;</script>
<script>window.GB_ADMIN_INITIAL=<?= json_encode(admin_payload(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>;</script>
<script src="../assets/js/admin-backend-bridge.js"></script>
<script src="../assets/js/admin-common.js"></script>
  <script>
    var editingReviewId = null;
    var selectedStars   = 5;
    var selectedReviewPhoto = "";

    function reviewExportRows(rows) {
      return rows.map(function (r) {
        var date = adminDateParts(r.created_at);
        return {
          ID: r.id || "",
          Name: r.name || "",
          Role: r.role || "",
          Rating: r.rating || 5,
          Review: r.text || "",
          Date: date.date,
          Time: date.time
        };
      });
    }

    function openReviewView(review) {
      var date = adminDateParts(review.created_at);
      openAdminViewModal(review.name || "Review", [
        { label: "Reviewer", value: review.name },
        { label: "Role / Company", value: review.role },
        { label: "Rating", value: (review.rating || 5) + " / 5" },
        { label: "Date", value: date.date },
        { label: "Time", value: date.time },
        { label: "Review", value: review.text, full: true },
        {
          label: "Photo",
          html: review.photo ? '<img class="admin-detail-image" src="' + esc(review.photo) + '" alt="' + esc(review.name || "Reviewer") + '">' : '<strong>-</strong>',
          full: true
        }
      ]);
    }

    function renderReviews() {
      var reviews = loadReviews();
      var list    = document.getElementById("reviewsList");
      var countEl = document.getElementById("reviewsCount");
      if (countEl) countEl.textContent = reviews.length;

      if (!reviews.length) {
        list.innerHTML = '<div class="empty-state">No reviews yet. Click <strong>+ Add Review</strong> to add the first one.</div>';
        return;
      }

      list.innerHTML =
        '<div class="admin-export-bar">' +
          '<button class="admin-export-btn csv" type="button" data-export-reviews="csv">' + adminIcon("csv") + 'CSV</button>' +
          '<button class="admin-export-btn pdf" type="button" data-export-reviews="pdf">' + adminIcon("pdf") + 'PDF</button>' +
        '</div>' +
        '<div class="admin-table-wrap"><table class="admin-data-table">' +
          '<thead><tr><th>Reviewer</th><th>Rating</th><th>Review</th><th>Date</th><th>Time</th><th>Actions</th></tr></thead><tbody>' +
          reviews.map(function (r) {
            var initial = (r.name || "?").charAt(0).toUpperCase();
            var color = avatarColor(r.name);
            var date = adminDateParts(r.created_at);
            var avatar = r.photo
              ? '<img class="review-table-photo" src="' + esc(r.photo) + '" alt="' + esc(r.name || "Reviewer") + '">'
              : '<div class="review-avatar" style="background:' + color + '">' + esc(initial) + '</div>';
            return (
              '<tr>' +
                '<td><div class="admin-cell-main">' + avatar + '<div><strong class="admin-row-title">' + esc(r.name) + '</strong><span class="admin-row-sub">' + esc(r.role || "-") + '</span></div></div></td>' +
                '<td><div class="review-stars">' + starsHtml(r.rating || 5) + '</div></td>' +
                '<td><div class="admin-text-limit">' + esc(r.text || "-") + '</div></td>' +
                '<td>' + esc(date.date) + '</td>' +
                '<td>' + esc(date.time) + '</td>' +
                '<td><div class="admin-table-actions">' +
                  '<button class="admin-icon-btn view" data-view-review="' + esc(r.id) + '" type="button" title="View">' + adminIcon("view") + '</button>' +
                  '<button class="admin-icon-btn edit btn-edit" data-edit="' + esc(r.id) + '" type="button" title="Edit">' + adminIcon("edit") + '</button>' +
                  '<button class="admin-icon-btn delete" data-del-review="' + esc(r.id) + '" type="button" title="Delete">' + adminIcon("trash") + '</button>' +
                '</div></td>' +
              '</tr>'
            );
          }).join("") +
          '</tbody></table></div>';

      list.querySelectorAll("[data-export-reviews]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var rows = reviewExportRows(loadReviews());
          if (btn.dataset.exportReviews === "csv") adminExportCsv("gobright-reviews", rows);
          if (btn.dataset.exportReviews === "pdf") adminExportPdf("GoBright Reviews", rows);
        });
      });

      list.querySelectorAll("[data-view-review]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var review = loadReviews().find(function (r) { return r.id === btn.dataset.viewReview; });
          if (review) openReviewView(review);
        });
      });

      list.querySelectorAll(".btn-edit").forEach(function (btn) {
        btn.addEventListener("click", function () { openReviewModal(btn.dataset.edit); });
      });

      list.querySelectorAll("[data-del-review]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var reviews = loadReviews();
          var id  = btn.getAttribute("data-del-review");
          var rev = reviews.find(function (r) { return r.id === id; });
          openAdminConfirmModal({
            title: "Delete Review",
            message: 'Delete review by "' + (rev ? rev.name : "this reviewer") + '" from database?',
            onConfirm: function () {
              saveReviews(reviews.filter(function (r) { return r.id !== id; }));
              renderReviews();
            }
          });
        });
      });
    }

    function setStars(val) {
      selectedStars = val;
      document.querySelectorAll(".star-btn").forEach(function (b) {
        b.classList.toggle("active", parseInt(b.dataset.val) <= val);
      });
      var countEl = document.getElementById("starCount");
      if (countEl) countEl.textContent = val + " / 5";
    }

    function setReviewPhoto(photo) {
      selectedReviewPhoto = photo || "";
      var preview = document.getElementById("reviewPhotoPreview");
      var placeholder = document.getElementById("reviewPhotoPlaceholder");
      var input = document.getElementById("reviewPhotoInput");
      if (!preview || !placeholder) return;
      if (selectedReviewPhoto) {
        preview.src = selectedReviewPhoto;
        preview.classList.remove("hidden");
        placeholder.classList.add("hidden");
      } else {
        preview.removeAttribute("src");
        preview.classList.add("hidden");
        placeholder.classList.remove("hidden");
        if (input) input.value = "";
      }
    }

    function handleReviewPhotoUpload(file) {
      if (!file) return;
      if (!/^image\/(png|jpe?g|webp|gif)$/i.test(file.type)) {
        alert("Please upload PNG, JPG, WEBP or GIF image.");
        return;
      }
      if (file.size > 3 * 1024 * 1024) {
        alert("Reviewer photo must be 3 MB or smaller.");
        return;
      }
      var reader = new FileReader();
      reader.onload = function (event) {
        setReviewPhoto(event.target.result || "");
      };
      reader.readAsDataURL(file);
    }

    function openReviewModal(editId) {
      editingReviewId = editId || null;
      var title   = document.getElementById("reviewModalTitle");
      var saveBtn = document.getElementById("saveReviewBtn");
      title.textContent   = editId ? "Edit Review"  : "Add Review";
      saveBtn.textContent = editId ? "Save Changes" : "Add Review";

      if (editId) {
        var rev = loadReviews().find(function (r) { return r.id === editId; });
        if (rev) {
          document.getElementById("reviewName").value  = rev.name;
          document.getElementById("reviewRole").value  = rev.role;
          setReviewPhoto(rev.photo || "");
          document.getElementById("reviewText").value  = rev.text;
          setStars(rev.rating || 5);
        }
      } else {
        document.getElementById("reviewName").value  = "";
        document.getElementById("reviewRole").value  = "";
        setReviewPhoto("");
        document.getElementById("reviewText").value  = "";
        setStars(5);
      }
      document.getElementById("reviewModal").classList.remove("hidden");
    }

    function closeReviewModal() {
      document.getElementById("reviewModal").classList.add("hidden");
      editingReviewId = null;
    }

    document.getElementById("addReviewBtn").addEventListener("click", function () { openReviewModal(); });
    document.getElementById("closeReviewModal").addEventListener("click", closeReviewModal);
    document.getElementById("cancelReviewBtn").addEventListener("click", closeReviewModal);
    document.getElementById("reviewModal").addEventListener("click", function (e) {
      if (e.target === this) closeReviewModal();
    });

    document.getElementById("reviewPhotoInput").addEventListener("change", function () {
      handleReviewPhotoUpload(this.files && this.files[0]);
    });

    document.querySelectorAll(".star-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { setStars(parseInt(btn.dataset.val)); });
      btn.addEventListener("mouseenter", function () {
        document.querySelectorAll(".star-btn").forEach(function (b) {
          b.classList.toggle("active", parseInt(b.dataset.val) <= parseInt(btn.dataset.val));
        });
      });
    });

    document.getElementById("starSelector").addEventListener("mouseleave", function () { setStars(selectedStars); });

    document.getElementById("saveReviewBtn").addEventListener("click", function () {
      var name = document.getElementById("reviewName").value.trim();
      var role = document.getElementById("reviewRole").value.trim();
      var text = document.getElementById("reviewText").value.trim();
      if (!name) { alert("Please enter the reviewer name."); return; }
      if (!text) { alert("Please enter the review text.");   return; }

      var reviews = loadReviews();
      if (editingReviewId) {
        reviews = reviews.map(function (r) {
          return r.id === editingReviewId
            ? { id: r.id, name: name, role: role, photo: selectedReviewPhoto, rating: selectedStars, text: text, created_at: r.created_at || adminNowDateTime() }
            : r;
        });
      } else {
        reviews.push({ id: uid(), name: name, role: role, photo: selectedReviewPhoto, rating: selectedStars, text: text, created_at: adminNowDateTime() });
      }
      saveReviews(reviews);
      closeReviewModal();
      renderReviews();
    });

    setStars(5);
    renderReviews();
  </script>
</body>
</html>
