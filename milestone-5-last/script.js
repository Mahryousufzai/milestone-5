var _a, _b;
(_a = document.getElementById("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    var profileInput = document.getElementById('pro');
    var nameElement = document.getElementById("name");
    var fatherNameElement = document.getElementById("father-name");
    var emailElement = document.getElementById("em");
    var phoneElement = document.getElementById("ph");
    var eduElement = document.getElementById("edu");
    var expElement = document.getElementById("experience");
    var skillElement = document.getElementById("skills");
    var userEl = document.getElementById("username");
    if (profileInput && nameElement && fatherNameElement && emailElement && phoneElement && eduElement && expElement && skillElement && userEl) {
        var name_1 = nameElement.value;
        var fatherName = fatherNameElement.value;
        var em = emailElement.value;
        var ph = phoneElement.value;
        var edu = eduElement.value;
        var experience = expElement.value;
        var skills = skillElement.value;
        var userName = userEl.value;
        var unq_1 = "resume/".concat(userName.replace(/\s+/g, '_'), "_cv.html");
        // Handle profile picture
        var proFl = (_a = profileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var proURL = proFl ? URL.createObjectURL(proFl) : "lighblue";
        // Create the resume output HTML, including username and father name
        var output = "\n            <h2>Resume</h2>\n            ".concat(proURL ? "<img src=\"".concat(proURL, "\" alt=\"profile\" class=\"profile\">") : '', "\n            <p><strong><i class=\"fas fa-user\"></i> Username:</strong> ").concat(userName, "</p>\n            <p><strong><i class=\"fas fa-user\"></i> Name:</strong> ").concat(name_1, "</p>\n            <p><strong><i class=\"fas fa-user\"></i> Father Name:</strong> ").concat(fatherName, "</p>\n            <p><strong><i class=\"fas fa-envelope\"></i> Email:</strong> ").concat(em, "</p>\n            <p><strong><i class=\"fas fa-phone\"></i> Phone:</strong> ").concat(ph, "</p>\n            <h3><i class=\"fas fa-graduation-cap\"></i> Education</h3>\n            <p>").concat(edu, "</p>\n            <h3><i class=\"fas fa-briefcase\"></i> Experience</h3>\n            <p>").concat(experience, "</p>\n            <h3><i class=\"fas fa-code\"></i> Skills</h3>\n            <p>").concat(skills, "</p>\n        ");
        var elres = document.getElementById("output");
        if (elres) {
            elres.innerHTML = output;
            var buttonContainer = document.getElementById("button-container");
            if (buttonContainer) {
                buttonContainer.innerHTML = '';
                var downloadPdfBtn = document.createElement('button');
                downloadPdfBtn.textContent = 'Download Resume';
                downloadPdfBtn.addEventListener('click', function () { return downloadResumeAsPDF(); });
                var shareLinkBtn = document.createElement('button');
                shareLinkBtn.textContent = 'Share Resume';
                shareLinkBtn.addEventListener('click', function () {
                    var shareableUrl = window.location.origin + '/' + unq_1;
                    navigator.clipboard.writeText(shareableUrl).then(function () {
                        alert('Resume link copied to clipboard!');
                    });
                });
                buttonContainer.appendChild(downloadPdfBtn);
                buttonContainer.appendChild(shareLinkBtn);
            }
        }
    }
    else {
        console.error("One or more element outputs are missing");
    }
});
function downloadResumeAsPDF() {
    var resumeElement = document.getElementById("output");
    var options = {
        margin: 1,
        filename: 'Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    if (resumeElement) {
        window.html2pdf().from(resumeElement).set(options).save();
    }
    else {
        console.error('Resume content is missing.');
    }
}
// Handle the profile image preview before form submission
(_b = document.getElementById("pro")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", function (event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("profile"); // Apply the profile class for styling
            // Attach image to the preview container
            var previewContainer = document.getElementById("image-preview-container");
            if (previewContainer) {
                previewContainer.innerHTML = ''; // Clear previous previews
                previewContainer.appendChild(img); // Add the new image
            }
        };
        reader.readAsDataURL(file); // Read the selected file as data URL
    }
});
