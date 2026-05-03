const BASE_URL = "http://localhost:3000/task";

async function runGetTest() {
    console.log("=== GET /task ===");
    try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        console.log("Response:", data);
    } catch (err) {
        console.error("Network error:", err.message);
    }
}

async function runPostTest() {
    console.log("\n=== POST /task (valid) ===");
    const validBody = {
        title: "Demo Task",
        description: "This is a valid task",
        category: "work",
    };

    console.log("Sending:", validBody);
    let res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validBody),
    });
    let data = await res.json();
    console.log("Response:", data);


    console.log("\n=== POST /task (invalid: description not string) ===");
    const invalidBody = {
        title: "Bad Task",
        description: 123, // invalid
        category: "work",
    };

    console.log("Sending:", invalidBody);
    res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invalidBody),
    });
    data = await res.json();
    console.log("Response:", data);
}

async function runDeleteTest() {
    console.log("\n=== DELETE /task (valid) ===");
    const validBody = { ids: [1, 2] };

    console.log("Sending:", validBody);
    let res = await fetch(BASE_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validBody),
    });
    let data = await res.json();
    console.log("Response:", data);

    console.log("\n=== DELETE /task (invalid: ids not array) ===");
    const invalidBody = { ids: [1, 2, 3, 4.5, 999, 2678, true, "5"] };

    console.log("Sending:", invalidBody);
    res = await fetch(BASE_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invalidBody),
    });
    data = await res.json();
    console.log("Response:", data);
}

async function runPatchTest() {
    console.log("\n=== PATCH /task/complete (valid) ===");
    const validBody = { ids: [3] };

    console.log("Sending:", validBody);
    let res = await fetch(`${BASE_URL}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validBody),
    });
    let data = await res.json();
    console.log("Response:", data);

    console.log("\n=== PATCH /task/complete (invalid: ids contains string) ===");
    const invalidBody = { ids: [3, "wrong-id"] };

    console.log("Sending:", invalidBody);
    res = await fetch(`${BASE_URL}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invalidBody),
    });
    data = await res.json();
    console.log("Response:", data);
}

async function runPutTest() {
    console.log("\n=== PUT /task (valid) ===");
    const validBody = {
        tasks: [
            {
                id: 4,
                title: "Updated Task Title",
                description: "Updated description",
                category: "work",
                completed: true
            },
        ],
    };

    console.log("Sending:", validBody);
    let res = await fetch(BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validBody),
    });
    let data = await res.json();
    console.log("Response:", data);

    console.log("\n=== PUT /task (invalid: tasks not array) ===");
    const invalidBody = { tasks: "not-an-array" };

    console.log("Sending:", invalidBody);
    res = await fetch(BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invalidBody),
    });
    data = await res.json();
    console.log("Response:", data);
}

async function runAllTests() {
    await runGetTest();
    await runPostTest();
    await runDeleteTest();
    await runPatchTest();
    await runPutTest();
}

runAllTests();
