console.log("Client script");
document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;

    edit(id);
  }
});

async function remove(id) {
  fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id) {
  let content = prompt("Введите новое значение");
  if (content) {
    content = content.trim();
    const res = await fetch(`/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: content }),
    });

    if (res.status === 200) {
      const title = document.querySelector(`[data-id="${id}"]`);
      title.innerHTML = content;
    }
  }
}
