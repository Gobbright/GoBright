(function () {
  var loggedIn    = sessionStorage.getItem("gobright_admin") === "1";
  var loginView   = document.getElementById("loginView");
  var adminView   = document.getElementById("adminView");
  var loginNotice = document.getElementById("loginNotice");

  var CLIENTS_KEY       = "gobright_clients";
  var REVIEWS_KEY       = "gobright_reviews";
  var EMPLOYEES_KEY     = "gobright_employees";
  var selectedImage     = null;
  var editingReviewId   = null;
  var editingEmployeeId = null;
  var selectedStars     = 5;
  var selectedEmpImage  = null;

  /* ── helpers ── */
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c];
    });
  }

  function uid() { return "c" + Date.now() + Math.random().toString(36).slice(2, 6); }

  /* ── greeting & date ── */
  function getGreeting() {
    var h = new Date().getHours();
    if (h >= 5  && h < 12) return "GOOD MORNING";
    if (h >= 12 && h < 17) return "GOOD AFTERNOON";
    if (h >= 17 && h < 21) return "GOOD EVENING";
    return "GOOD NIGHT";
  }

  function getFormattedDate() {
    return new Date().toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
  }

  /* ── section switching ── */
  function switchSection(name) {
    document.querySelectorAll(".nav-item").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.section === name);
    });
    document.querySelectorAll(".section").forEach(function (s) {
      s.classList.remove("active");
    });
    var el = document.getElementById("section-" + name);
    if (el) el.classList.add("active");
    if (name === "clients") renderClients();
    if (name === "reviews")   renderReviews();
    if (name === "employees") renderEmployees();
    if (name === "hiring")    renderJobs();
  }

  /* ── stat card definitions ── */
  var STATS = [
    { key:"clients",   label:"Total Clients",        sub:"Added to website",            color:"#3b82f6", iconBg:"rgba(59,130,246,.15)",  section:"clients",
      icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20M9 21V9"/></svg>' },
    { key:"reviews",   label:"Google Reviews",       sub:"Published on website",         color:"#f59e0b", iconBg:"rgba(245,158,11,.15)",  section:"reviews",
      icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
    { key:"employees", label:"Total Employees",      sub:"GoBright Team",               color:"#e32028", iconBg:"rgba(227,32,40,.15)",   section:"employees",
      icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { key:"careers",   label:"Career Applications",  sub:"Submitted from careers page",  color:"#a855f7", iconBg:"rgba(168,85,247,.15)",  section:"careers",
      icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' },
    { key:"leads",     label:"Lead Forms",           sub:"Website enquiries",            color:"#22c55e", iconBg:"rgba(34,197,94,.15)",   section:"leads",
      icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' }
  ];

  function renderStats() {
    var clients   = loadClients();
    var reviews   = loadReviews();
    var employees = loadEmployees();
    var counts    = { clients: clients.length, reviews: reviews.length, employees: employees.length };

    document.getElementById("statsGrid").innerHTML = STATS.map(function (s) {
      var val = counts[s.key] != null ? counts[s.key] : 0;
      return (
        '<div class="stat-card" data-goto="' + s.section + '">' +
          '<div class="stat-card-top">' +
            '<div class="stat-icon" style="background:' + s.iconBg + ';color:' + s.color + '">' + s.icon + '</div>' +
            '<div class="stat-chevron"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div>' +
          '</div>' +
          '<div class="stat-number" style="color:' + s.color + '">' + val + '</div>' +
          '<div class="stat-title">' + s.label + '</div>' +
          '<div class="stat-sub">'   + s.sub   + '</div>' +
        '</div>'
      );
    }).join("");

    document.querySelectorAll(".stat-card").forEach(function (card) {
      card.addEventListener("click", function () { switchSection(card.dataset.goto); });
    });
  }

  /* ── client data (localStorage) ── */
  function loadClients() {
    try { return JSON.parse(localStorage.getItem(CLIENTS_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveClients(arr) {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(arr));
  }

  function renderClients() {
    var clients = loadClients();
    var grid    = document.getElementById("clientsGrid");
    var countEl = document.getElementById("clientsCount");

    if (countEl) countEl.textContent = clients.length;
    renderStats();

    if (!clients.length) {
      grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">No clients yet. Click <strong>+ Add Client</strong> to add the first one.</div>';
      return;
    }

    grid.innerHTML = clients.map(function (c) {
      return (
        '<div class="client-card">' +
          '<div class="client-logo-wrap">' +
            '<img src="' + esc(c.img) + '" alt="' + esc(c.name) + '" class="client-logo">' +
            '<button class="client-delete" data-del="' + esc(c.id) + '" type="button" title="Remove">&#10005;</button>' +
          '</div>' +
          '<p class="client-name">' + esc(c.name) + '</p>' +
        '</div>'
      );
    }).join("");

    grid.querySelectorAll(".client-delete").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!confirm('Remove "' + btn.dataset.del + '"?')) return;
        saveClients(loadClients().filter(function (c) { return c.id !== btn.dataset.del; }));
        renderClients();
      });
    });
  }

  /* ── review data (localStorage) ── */
  var AVATAR_COLORS = ["#e32028","#a855f7","#3b82f6","#22c55e","#f97316","#14b8a6","#f59e0b","#ec4899"];

  function avatarColor(name) {
    var code = 0;
    for (var i = 0; i < (name || "").length; i++) code += name.charCodeAt(i);
    return AVATAR_COLORS[code % AVATAR_COLORS.length];
  }

  function loadReviews() {
    try { return JSON.parse(localStorage.getItem(REVIEWS_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveReviews(arr) { localStorage.setItem(REVIEWS_KEY, JSON.stringify(arr)); }

  function starsHtml(rating) {
    var s = "";
    for (var i = 1; i <= 5; i++) {
      s += '<span class="' + (i <= rating ? "" : "star-off") + '">★</span>';
    }
    return s;
  }

  function renderReviews() {
    var reviews = loadReviews();
    var list    = document.getElementById("reviewsList");
    var countEl = document.getElementById("reviewsCount");
    if (countEl) countEl.textContent = reviews.length;
    renderStats();

    if (!reviews.length) {
      list.innerHTML = '<div class="empty-state">No reviews yet. Click <strong>+ Add Review</strong> to add the first one.</div>';
      return;
    }

    list.innerHTML = reviews.map(function (r) {
      var initial = (r.name || "?").charAt(0).toUpperCase();
      var color   = avatarColor(r.name);
      return (
        '<div class="review-item">' +
          '<div class="review-avatar" style="background:' + color + '">' + initial + '</div>' +
          '<div class="review-body">' +
            '<div class="review-name">' + esc(r.name) + '</div>' +
            '<div class="review-role">' + esc(r.role) + '</div>' +
            '<div class="review-stars">' + starsHtml(r.rating || 5) + '</div>' +
            '<div class="review-text">' + esc(r.text) + '</div>' +
          '</div>' +
          '<div class="review-actions">' +
            '<button class="btn-edit" data-edit="' + esc(r.id) + '" type="button">Edit</button>' +
            '<button class="btn-delete-icon" data-del-review="' + esc(r.id) + '" type="button" title="Delete">' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>'
      );
    }).join("");

    list.querySelectorAll(".btn-edit").forEach(function (btn) {
      btn.addEventListener("click", function () { openReviewModal(btn.dataset.edit); });
    });

    list.querySelectorAll("[data-del-review]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var reviews = loadReviews();
        var id  = btn.dataset.delReview || btn.getAttribute("data-del-review");
        var rev = reviews.find(function (r) { return r.id === id; });
        if (!confirm('Delete review by "' + (rev ? rev.name : "") + '"?')) return;
        saveReviews(reviews.filter(function (r) { return r.id !== id; }));
        renderReviews();
      });
    });
  }

  /* ── review modal ── */
  function setStars(val) {
    selectedStars = val;
    document.querySelectorAll(".star-btn").forEach(function (b) {
      b.classList.toggle("active", parseInt(b.dataset.val) <= val);
    });
    var countEl = document.getElementById("starCount");
    if (countEl) countEl.textContent = val + " / 5";
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
        document.getElementById("reviewPhoto").value = rev.photo || "";
        document.getElementById("reviewText").value  = rev.text;
        setStars(rev.rating || 5);
      }
    } else {
      document.getElementById("reviewName").value  = "";
      document.getElementById("reviewRole").value  = "";
      document.getElementById("reviewPhoto").value = "";
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
        var ph = document.getElementById("reviewPhoto").value.trim();
        return r.id === editingReviewId
          ? { id: r.id, name: name, role: role, photo: ph, rating: selectedStars, text: text }
          : r;
      });
    } else {
      var photo = document.getElementById("reviewPhoto").value.trim();
      reviews.push({ id: uid(), name: name, role: role, photo: photo, rating: selectedStars, text: text });
    }
    saveReviews(reviews);
    closeReviewModal();
    renderReviews();
  });

  /* ── employee data (localStorage) ── */
  function loadEmployees() {
    try { return JSON.parse(localStorage.getItem(EMPLOYEES_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveEmployees(arr) { localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(arr)); }

  function nextEmpId() {
    var emps = loadEmployees();
    if (!emps.length) return "GB2026001";
    var nums = emps.map(function (e) { return parseInt((e.empId || "GB2026000").slice(2)) || 0; });
    return "GB" + String(Math.max.apply(null, nums) + 1).padStart(7, "0");
  }

  function renderEmployees(filter) {
    var emps    = loadEmployees();
    var list    = document.getElementById("employeesList");
    var countEl = document.getElementById("employeesCount");
    if (countEl) countEl.textContent = emps.length;
    renderStats();

    var q = (filter || "").toLowerCase();
    var filtered = q ? emps.filter(function (e) {
      return (e.name  || "").toLowerCase().includes(q) ||
             (e.role  || "").toLowerCase().includes(q) ||
             (e.empId || "").toLowerCase().includes(q);
    }) : emps;

    if (!filtered.length) {
      list.innerHTML = '<div class="empty-state">' +
        (q ? 'No employees match "' + esc(q) + '"' :
             'No employees yet. Click <strong>+ Add Employee</strong> to add the first one.') +
        '</div>';
      return;
    }

    list.innerHTML = filtered.map(function (e) {
      var initial   = (e.name || "?").replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s*/i, "").charAt(0).toUpperCase();
      var color     = avatarColor(e.name);
      var photoHtml = e.photo
        ? '<img src="' + esc(e.photo) + '" alt="' + esc(e.name) + '" class="emp-photo">'
        : '<div class="emp-avatar" style="background:' + color + '">' + initial + '</div>';
      var statusCls = e.status === "inactive" ? "status-inactive" : "status-active";
      var statusLbl = e.status === "inactive" ? "inactive" : "active";
      return (
        '<div class="emp-row">' +
          '<div class="emp-photo-wrap">' + photoHtml + '</div>' +
          '<div class="emp-info">' +
            '<div class="emp-name">' + esc(e.name)  + '</div>' +
            '<div class="emp-role">' + esc(e.role)  + '</div>' +
          '</div>' +
          '<div class="emp-actions">' +
            '<span class="emp-id-text">'  + esc(e.empId) + '</span>' +
            '<span class="emp-status ' + statusCls + '">● ' + statusLbl + '</span>' +
            (e.photo ? '<span class="emp-photo-badge">● Photo</span>' : '') +
            '<button class="btn-edit emp-edit-btn" data-edit="' + esc(e.id) + '" type="button">Edit</button>' +
            '<button class="btn-delete-red" data-del="' + esc(e.id) + '" type="button">Delete</button>' +
          '</div>' +
        '</div>'
      );
    }).join("");

    list.querySelectorAll(".emp-edit-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { openEmployeeModal(btn.dataset.edit); });
    });

    list.querySelectorAll("[data-del]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var emps = loadEmployees();
        var emp  = emps.find(function (e) { return e.id === btn.dataset.del; });
        if (!confirm('Delete "' + (emp ? emp.name : "") + '"?')) return;
        saveEmployees(emps.filter(function (e) { return e.id !== btn.dataset.del; }));
        renderEmployees(document.getElementById("empSearch").value);
      });
    });
  }

  /* ── employee modal ── */
  function setEmpPhotoThumb(src) {
    var prev = document.getElementById("empImagePreview");
    var icon = document.getElementById("empPhotoIcon");
    if (src) {
      prev.src = src;
      prev.classList.remove("hidden");
      if (icon) icon.style.display = "none";
    } else {
      prev.classList.add("hidden");
      if (icon) icon.style.display = "";
    }
  }

  function openEmployeeModal(editId) {
    editingEmployeeId  = editId || null;
    selectedEmpImage   = null;
    var saveBtn = document.getElementById("saveEmployeeBtn");
    var title   = document.getElementById("empModalTitle");
    title.textContent   = editId ? "Edit Employee" : "Add Employee";
    saveBtn.textContent = editId ? "Save Changes"  : "Add Employee";

    document.getElementById("empImageInput").value = "";
    setEmpPhotoThumb(null);

    if (editId) {
      var emp = loadEmployees().find(function (e) { return e.id === editId; });
      if (emp) {
        document.getElementById("empIdField").value   = emp.empId;
        document.getElementById("empName").value      = emp.name;
        document.getElementById("empRole").value      = emp.role;
        document.getElementById("empExpertise").value = emp.expertise || "";
        document.getElementById("empPassword").value  = "";
        document.getElementById("empStatus").value    = emp.status || "active";
        if (emp.photo) { selectedEmpImage = emp.photo; setEmpPhotoThumb(emp.photo); }
      }
    } else {
      document.getElementById("empIdField").value   = nextEmpId();
      document.getElementById("empName").value      = "";
      document.getElementById("empRole").value      = "";
      document.getElementById("empExpertise").value = "";
      document.getElementById("empPassword").value  = "";
      document.getElementById("empStatus").value    = "active";
    }
    document.getElementById("employeeModal").classList.remove("hidden");
  }

  function closeEmployeeModal() {
    document.getElementById("employeeModal").classList.add("hidden");
    editingEmployeeId = null;
  }

  document.getElementById("addEmployeeBtn").addEventListener("click", function () { openEmployeeModal(); });
  document.getElementById("closeEmployeeModal").addEventListener("click", closeEmployeeModal);
  document.getElementById("cancelEmployeeBtn").addEventListener("click", closeEmployeeModal);
  document.getElementById("employeeModal").addEventListener("click", function (e) {
    if (e.target === this) closeEmployeeModal();
  });

  document.getElementById("empImageInput").addEventListener("change", function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      selectedEmpImage = ev.target.result;
      setEmpPhotoThumb(selectedEmpImage);
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("saveEmployeeBtn").addEventListener("click", function () {
    var empId     = document.getElementById("empIdField").value.trim();
    var name      = document.getElementById("empName").value.trim();
    var role      = document.getElementById("empRole").value.trim();
    var expertise = document.getElementById("empExpertise").value.trim();
    var password  = document.getElementById("empPassword").value.trim();
    var status    = document.getElementById("empStatus").value;
    if (!name) { alert("Please enter the employee name."); return; }
    if (!role) { alert("Please enter the role/position."); return; }

    var emps = loadEmployees();
    if (editingEmployeeId) {
      emps = emps.map(function (e) {
        if (e.id !== editingEmployeeId) return e;
        return {
          id: e.id, empId: empId, name: name, role: role,
          expertise: expertise, status: status,
          photo: selectedEmpImage || e.photo || "",
          password: password || e.password || ""
        };
      });
    } else {
      emps.push({ id: uid(), empId: empId, name: name, role: role, expertise: expertise, status: status, photo: selectedEmpImage || "", password: password });
    }
    saveEmployees(emps);
    closeEmployeeModal();
    renderEmployees(document.getElementById("empSearch").value);
  });

  /* live search */
  document.getElementById("empSearch").addEventListener("input", function () {
    renderEmployees(this.value);
  });

  /* ── hiring / jobs (localStorage) ── */
  var JOBS_KEY    = "gobright_jobs";
  var editingJobId = null;

  function loadJobs() {
    try { return JSON.parse(localStorage.getItem(JOBS_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveJobs(arr) { localStorage.setItem(JOBS_KEY, JSON.stringify(arr)); }

  function jobTypeCls(type) {
    var t = (type || "").toLowerCase().replace(/[^a-z]/g, "");
    if (t === "fulltime")   return "job-type-fulltime";
    if (t === "parttime")   return "job-type-parttime";
    if (t === "internship") return "job-type-internship";
    if (t === "contract")   return "job-type-contract";
    return "job-type-fulltime";
  }

  function renderJobs() {
    var jobs    = loadJobs();
    var list    = document.getElementById("jobsList");
    var countEl = document.getElementById("jobsCount");
    if (countEl) countEl.textContent = jobs.length;

    if (!jobs.length) {
      list.innerHTML = '<div class="empty-state">No job openings yet. Click <strong>+ Add Job</strong> to create one.</div>';
      return;
    }

    list.innerHTML = jobs.map(function (j) {
      var reqs      = (j.requirements || []).filter(Boolean);
      var statusCls = j.status === "Inactive" ? "status-inactive" : "status-active";
      return (
        '<div class="job-row">' +
          '<div class="job-row-top">' +
            '<span class="job-title">'  + esc(j.title) + '</span>' +
            '<span class="job-type-badge ' + jobTypeCls(j.type) + '">' + esc(j.type) + '</span>' +
            (j.experience ? '<span class="job-exp-badge">' + esc(j.experience) + '</span>' : '') +
            '<span class="emp-status ' + statusCls + '">● ' + esc(j.status) + '</span>' +
          '</div>' +
          '<div class="job-row-meta">' +
            '<div class="job-body">' +
              '<div class="job-desc">' + esc(j.description) + '</div>' +
              (reqs.length ? '<div class="job-reqs-count">' + reqs.length + ' requirement' + (reqs.length !== 1 ? 's' : '') + '</div>' : '') +
            '</div>' +
            '<div class="job-actions">' +
              '<button class="btn-edit job-edit-btn" data-edit="' + esc(j.id) + '" type="button">Edit</button>' +
              '<button class="btn-delete-red" data-jdel="' + esc(j.id) + '" type="button">Delete</button>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");

    list.querySelectorAll(".job-edit-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { openJobModal(btn.dataset.edit); });
    });

    list.querySelectorAll("[data-jdel]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var jobs = loadJobs();
        var j    = jobs.find(function (x) { return x.id === btn.dataset.jdel; });
        if (!confirm('Delete "' + (j ? j.title : "") + '"?')) return;
        saveJobs(jobs.filter(function (x) { return x.id !== btn.dataset.jdel; }));
        renderJobs();
      });
    });
  }

  function getReqInputs() {
    return Array.from(document.querySelectorAll(".job-req-input"));
  }

  function openJobModal(editId) {
    editingJobId = editId || null;
    var title   = document.getElementById("jobModalTitle");
    var saveBtn = document.getElementById("saveJobBtn");
    title.textContent   = editId ? "Edit Job Opening" : "Add Job Opening";
    saveBtn.textContent = editId ? "Save Changes"     : "Add Job";

    if (editId) {
      var j = loadJobs().find(function (x) { return x.id === editId; });
      if (j) {
        document.getElementById("jobTitle").value = j.title;
        document.getElementById("jobType").value  = j.type;
        document.getElementById("jobExp").value   = j.experience || "";
        document.getElementById("jobDesc").value  = j.description;
        document.getElementById("jobActive").checked = j.status !== "Inactive";
        getReqInputs().forEach(function (inp, i) {
          inp.value = (j.requirements || [])[i] || "";
        });
      }
    } else {
      document.getElementById("jobTitle").value = "";
      document.getElementById("jobType").value  = "Full-time";
      document.getElementById("jobExp").value   = "";
      document.getElementById("jobDesc").value  = "";
      document.getElementById("jobActive").checked = true;
      getReqInputs().forEach(function (inp) { inp.value = ""; });
    }
    document.getElementById("jobModal").classList.remove("hidden");
  }

  function closeJobModal() {
    document.getElementById("jobModal").classList.add("hidden");
    editingJobId = null;
  }

  document.getElementById("addJobBtn").addEventListener("click", function () { openJobModal(); });
  document.getElementById("closeJobModal").addEventListener("click", closeJobModal);
  document.getElementById("cancelJobBtn").addEventListener("click", closeJobModal);
  document.getElementById("jobModal").addEventListener("click", function (e) {
    if (e.target === this) closeJobModal();
  });

  document.getElementById("saveJobBtn").addEventListener("click", function () {
    var title  = document.getElementById("jobTitle").value.trim();
    var type   = document.getElementById("jobType").value;
    var exp    = document.getElementById("jobExp").value.trim();
    var desc   = document.getElementById("jobDesc").value.trim();
    var active = document.getElementById("jobActive").checked;
    var status = active ? "Active" : "Inactive";
    var reqs   = getReqInputs().map(function (inp) { return inp.value.trim(); }).filter(Boolean);

    if (!title) { alert("Please enter the job title."); return; }

    var jobs = loadJobs();
    if (editingJobId) {
      jobs = jobs.map(function (j) {
        return j.id === editingJobId
          ? { id: j.id, title: title, type: type, experience: exp, status: status, description: desc, requirements: reqs }
          : j;
      });
    } else {
      jobs.push({ id: uid(), title: title, type: type, experience: exp, status: status, description: desc, requirements: reqs });
    }
    saveJobs(jobs);
    closeJobModal();
    renderJobs();
  });

  /* ── Add Client modal ── */
  function openModal() {
    selectedImage = null;
    document.getElementById("clientName").value = "";
    document.getElementById("clientImageInput").value = "";
    document.getElementById("imagePreview").classList.add("hidden");
    document.getElementById("uploadPlaceholder").classList.remove("hidden");
    document.getElementById("addClientModal").classList.remove("hidden");
  }

  function closeModal() {
    document.getElementById("addClientModal").classList.add("hidden");
  }

  document.getElementById("addClientBtn").addEventListener("click", openModal);
  document.getElementById("closeClientModal").addEventListener("click", closeModal);
  document.getElementById("cancelClientBtn").addEventListener("click", closeModal);

  document.getElementById("addClientModal").addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });

  document.getElementById("clientImageInput").addEventListener("change", function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      selectedImage = ev.target.result;
      var preview = document.getElementById("imagePreview");
      preview.src = selectedImage;
      preview.classList.remove("hidden");
      document.getElementById("uploadPlaceholder").classList.add("hidden");
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("saveClientBtn").addEventListener("click", function () {
    var name = document.getElementById("clientName").value.trim();
    if (!name)          { alert("Please enter the client name.");  return; }
    if (!selectedImage) { alert("Please select a client logo.");   return; }

    var clients = loadClients();
    clients.push({ id: uid(), name: name, img: selectedImage });
    saveClients(clients);
    closeModal();
    renderClients();
  });

  /* ── delete confirmation (fix: show real name) ── */
  /* delete handler re-bound on each render so del-id check needs real client lookup */

  /* ── login / logout ── */
  function showNotice(msg) {
    loginNotice.textContent = msg;
    loginNotice.classList.add("show");
  }

  function setLoggedIn(value) {
    loggedIn = value;
    sessionStorage.setItem("gobright_admin", value ? "1" : "0");
    loginView.style.display = value ? "none" : "";
    adminView.classList.toggle("active", value);
    if (value) initDashboard();
  }

  function initDashboard() {
    document.getElementById("greetingText").textContent = getGreeting();
    document.getElementById("headerDate").textContent   = getFormattedDate();
    renderStats();
  }

  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    loginNotice.classList.remove("show");
    showNotice("Use the secure admin login page.");
  });

  document.getElementById("logoutBtn").addEventListener("click", function () {
    sessionStorage.removeItem("gobright_admin");
    setLoggedIn(false);
    loginView.style.display = "";
  });

  /* ── sidebar navigation ── */
  document.querySelectorAll(".nav-item").forEach(function (btn) {
    btn.addEventListener("click", function () { switchSection(btn.dataset.section); });
  });

  /* ── quick action buttons ── */
  document.querySelectorAll(".action-btn[data-goto]").forEach(function (btn) {
    btn.addEventListener("click", function () { switchSection(btn.dataset.goto); });
  });

  /* ── resume session ── */
  if (loggedIn) setLoggedIn(true);
}());
