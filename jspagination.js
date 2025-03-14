const apiurl = "https://67d2c53090e0670699bef895.mockapi.io/api/v2/data";
let users = [];
let currentpage = 1;
let recordperpage = 7;

const fetchdata = async () => {
    try {
        const response = await fetch(apiurl);
        users = await response.json();
        console.log(users);
        displayuser();
    } catch (error) {
        console.error("Not fetching from API");
    }
};

fetchdata();

const displayuser = () => {
    const start = (currentpage - 1) * recordperpage;
    const end = start + recordperpage;

    const paginateusers = users.slice(start, end); // Get users for the current page
    console.log(paginateusers);

    const tbody = document.querySelector(".usertable"); // Assuming your table body has the class 'usertable'
    tbody.innerHTML = ""; // Clear existing rows

    paginateusers.forEach(user => {
        const row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.city}</td>
                <td>${user.country}</td>
                <td>${user.pincode}</td>
                <td>${user.phone}</td>
                <td>${user.department}</td>
                <td>${user.dob}</td>
            </tr>
        `;
        tbody.innerHTML += row; // Append new row to the table
    });

    updatePagination();
};

const updatePagination = () => {
    const totalpages = Math.ceil(users.length / recordperpage);
    const paginationButtons = document.querySelector(".pagination");

    paginationButtons.innerHTML = ""; // Clear existing pagination buttons

    // Previous button
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.onclick = () => changePage("prev");
    paginationButtons.appendChild(prevButton);

    // Page number buttons
    for (let i = 1; i <= totalpages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.onclick = () => goToPage(i);
        if (i === currentpage) {
            pageButton.disabled = true; // Disable the button for the current page
        }
        paginationButtons.appendChild(pageButton);
    }

    // Last button
    const lastButton = document.createElement("button");
    lastButton.textContent = "Last";
    lastButton.onclick = () => goToPage(totalpages);
    paginationButtons.appendChild(lastButton);
};

const goToPage = (page) => {
    currentpage = page;
    displayuser();
};

const changePage = (direction) => {
    if (direction === "prev" && currentpage > 1) {
        currentpage--;
    } else if (direction === "next" && currentpage < Math.ceil(users.length / recordperpage)) {
        currentpage++;
    }
    displayuser();
};

fetchdata();