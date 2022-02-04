document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;

    editNote(id).then(({ status, title }) => {
      if (status === 200) {
        event.target.closest("li").firstElementChild.innerHTML = title;
      }
    });
  }
});

async function remove(id) {
  fetch(`/${id}`, { method: "DELETE" });
}

async function editNote(id) {
  let title = prompt("Введите новое значение");
  if (title) {
    title = title.trim();
    const res = await fetch(`/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title }),
    });

    return { status: res.status, title: title };
  }
}
