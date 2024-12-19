document.addEventListener('DOMContentLoaded', function () {
    const rowsPerPage = 2; // Define records per page
    var paginationList = document.getElementById('pagination_list')
    var table = document.getElementById('data_table')
    var tbody = table.querySelector('tbody');

    function initPagination() {
        let rows = Array.from(tbody.querySelectorAll('tr'));
        rows.forEach((row) => {
            row.dataset.visible = 'true'  
        })
        paginate();
    }

    document.addEventListener('rzSearchChanged', function(event) {
        Array.from(tbody.querySelectorAll('tr')).forEach((row) => {
            if (rzSearch.records.includes(row)) {
                row.setAttribute('data-visible', 'true');
            } else {
                row.setAttribute('data-visible', 'false');
                row.style.display = 'none'
            }
        });
        paginate()
    });

    function paginate() {
        const rows = Array.from(tbody.querySelectorAll('tr[data-visible="true"]'));
        const totalPages = Math.ceil(rows.length / rowsPerPage);
        paginationList.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = 'page-item';
            const pageLink = document.createElement('a');
            pageLink.className = 'page-link';
            pageLink.href = '#';
            pageLink.textContent = i;

            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                showPage(i);
            });

            pageItem.appendChild(pageLink);
            paginationList.appendChild(pageItem);
        }

        showPage(1);
    }

    function showPage(page) {
        const rows = Array.from(tbody.querySelectorAll('tr[data-visible="true"]'));
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;

        rows.forEach((row, index) => {
            row.style.display = index >= startIndex && index < endIndex ? '' : 'none';
        });

        // Highlight the current page
        Array.from(paginationList.children).forEach((item, index) => {
            item.classList.toggle('active', index === page - 1);
        });
    }

    initPagination(); // Initialize table
});
