let elInput;
let elTitle;
let elementsByDataSetId;
let elementsByDataSetType;
const actions = ["edit", "save", "cancel", "remove", "input"];

document.addEventListener("click", (event) => {
  let id;
  if (actions.includes(event.target.dataset.type)) {
    id = event.target.dataset.id;
    elementsByDataSetId = Array.from(
      document.querySelectorAll(`[data-id="${id}"]`)
    );
    elementsByDataSetType = Array.from(
      document.querySelectorAll(`[data-type="edit"]`)
    );
    elInput = elementsByDataSetId.find((el) => "input" === el.dataset.type);
    elTitle = elementsByDataSetId.find((el) => "title" === el.dataset.type);
  }

  if (event.target.dataset.type === "remove") {
    removeNote(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "save") {
    editNote(id);
  }

  if (event.target.dataset.type === "edit") {
    openEdit(id);
  }

  if (event.target.dataset.type === "cancel") {
    closeEdit(id);
  }
});

async function removeNote(id) {
  fetch(`/${id}`, { method: "DELETE" });
}

async function editNote(id) {
  if (!elInput.value) {
    // toast danger
  } else {
    let updateTitle = elInput.value;
    updateTitle = updateTitle.trim();
    const res = await fetch(`/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: updateTitle }),
    });

    if (res.status === 200) {
      elTitle.innerText = elInput.value;
      closeEdit(id);
    }
  }
}

function openEdit(id) {
  elInput.value = elTitle.innerText;
  elementsByDataSetId.forEach((el) => {
    if (
      actions.includes(el.dataset.type) &&
      el.dataset.type !== "edit" &&
      el.dataset.type !== "remove"
    ) {
      el.classList.remove("visually-hidden");
    } else {
      el.classList.add("visually-hidden");
    }
  });
  elementsByDataSetType.forEach((el) => {
    if (el.dataset.id !== id) {
      el.setAttribute("disabled", "disabled");
    }
  });
}

function closeEdit(id) {
  elementsByDataSetId.forEach((el) => {
    if (
      actions.includes(el.dataset.type) &&
      el.dataset.type !== "edit" &&
      el.dataset.type !== "remove"
    ) {
      el.classList.add("visually-hidden");
    } else {
      el.classList.remove("visually-hidden");
    }
  });
  elementsByDataSetType.forEach((el) => {
    if (el.dataset.id !== id) {
      el.removeAttribute("disabled");
    }
  });
}
