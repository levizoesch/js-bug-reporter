class BugReporter {

    constructor(postUrl) {
        this.postUrl = postUrl;
        this.currentUrl = window.location.href;
        this.previousUrl = document.referrer;
    }

    report() {
        Swal.fire({
            icon: 'info',
            title: 'Report Bug',
            html: `
                <form id="bugReportForm">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" id="title" required></input>
                    </div>
                    <div class="form-group">
                        <label for="comment">Bug Description</label>
                        <textarea class="form-control" id="comment" rows="3" required></textarea>
                    </div>
                </form>
            `,
            showCancelButton: true,
            confirmButtonText: 'Submit',
            preConfirm: () => {
                if (this.validateForm()) {
                    const title = document.getElementById('title').value;
                    const comment = document.getElementById('comment').value;
                    this.submitBugReport(title, comment);
                } else {
                    return false;
                }
            }
        });
    }

    validateForm() {
        return document.getElementById('bugReportForm').checkValidity();
    }

    submitBugReport(title, comment) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('comment', comment);
        formData.append('current_url', this.currentUrl);
        formData.append('previous_url', this.previousUrl);

        fetch(this.postUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-Token': '{{ csrf_token() }}'
            }
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Bug Reported Successfully',
                    text: 'Thank you for reporting the bug!'
                });
            } else {
                throw new Error('Failed to report bug');
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to report bug. Please try again later.'
            });
        });
    }
}
