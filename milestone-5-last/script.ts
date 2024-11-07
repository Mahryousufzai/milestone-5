
document.getElementById("form")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const profileInput = document.getElementById('pro') as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const fatherNameElement = document.getElementById("father-name") as HTMLInputElement;
    const emailElement = document.getElementById("em") as HTMLInputElement;
    const phoneElement = document.getElementById("ph") as HTMLInputElement;
    const eduElement = document.getElementById("edu") as HTMLInputElement;
    const expElement = document.getElementById("experience") as HTMLInputElement;
    const skillElement = document.getElementById("skills") as HTMLInputElement;
    const userEl = document.getElementById("username") as HTMLInputElement;

    if (profileInput && nameElement && fatherNameElement && emailElement && phoneElement && eduElement && expElement && skillElement && userEl) {
        const name = nameElement.value;
        const fatherName = fatherNameElement.value;
        const em = emailElement.value;
        const ph = phoneElement.value;
        const edu = eduElement.value;
        const experience = expElement.value;
        const skills = skillElement.value;
        const userName = userEl.value;

        const unq = `resume/${userName.replace(/\s+/g, '_')}_cv.html`;

        // Handle profile picture
        const proFl = profileInput.files?.[0];
        const proURL = proFl ? URL.createObjectURL(proFl) : "lighblue";

        // Create the resume output HTML, including username and father name
        const output = `
            <h2>Resume</h2>
            ${proURL ? `<img src="${proURL}" alt="profile" class="profile">` : ''}
            <p><strong><i class="fas fa-user"></i> Username:</strong> ${userName}</p>
            <p><strong><i class="fas fa-user"></i> Name:</strong> ${name}</p>
            <p><strong><i class="fas fa-user"></i> Father Name:</strong> ${fatherName}</p>
            <p><strong><i class="fas fa-envelope"></i> Email:</strong> ${em}</p>
            <p><strong><i class="fas fa-phone"></i> Phone:</strong> ${ph}</p>
            <h3><i class="fas fa-graduation-cap"></i> Education</h3>
            <p>${edu}</p>
            <h3><i class="fas fa-briefcase"></i> Experience</h3>
            <p>${experience}</p>
            <h3><i class="fas fa-code"></i> Skills</h3>
            <p>${skills}</p>
        `;

        const elres = document.getElementById("output");
        if (elres) {
            elres.innerHTML = output;

            const buttonContainer = document.getElementById("button-container");
            if (buttonContainer) {
                buttonContainer.innerHTML = '';

                const downloadPdfBtn = document.createElement('button');
                downloadPdfBtn.textContent = 'Download Resume';
                downloadPdfBtn.addEventListener('click', () => downloadResumeAsPDF());

                const shareLinkBtn = document.createElement('button');
                shareLinkBtn.textContent = 'Share Resume';
                shareLinkBtn.addEventListener('click', () => {
                    const shareableUrl = window.location.origin + '/' + unq;
                    navigator.clipboard.writeText(shareableUrl).then(() => {
                        alert('Resume link copied to clipboard!');
                    });
                });

                buttonContainer.appendChild(downloadPdfBtn);
                buttonContainer.appendChild(shareLinkBtn);
            }
        }
    } else {
        console.error("One or more element outputs are missing");
    }
});

function downloadResumeAsPDF() {
    const resumeElement = document.getElementById("output");
    const options = {
        margin: 1,
        filename: 'Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (resumeElement) {
        (window as any).html2pdf().from(resumeElement).set(options).save();
    } else {
        console.error('Resume content is missing.');
    }
}

// Handle the profile image preview before form submission
document.getElementById("pro")?.addEventListener("change", function (event: any) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e: any) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("profile");  // Apply the profile class for styling

            // Attach image to the preview container
            const previewContainer = document.getElementById("image-preview-container");
            if (previewContainer) {
                previewContainer.innerHTML = '';  // Clear previous previews
                previewContainer.appendChild(img);  // Add the new image
            }
        };
        reader.readAsDataURL(file);  // Read the selected file as data URL
    }
});