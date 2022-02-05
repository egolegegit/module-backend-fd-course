const actions = ["edit", "save", "cancel", "remove", "input"];
let elementByDataSetId;
let elementByDataSetType;
let elInput;
let elTitle;

document.addEventListener("click", (event) => {
  let id;
  if (actions.includes(event.target.dataset.type)) {
    id = event.target.dataset.id;
    elementByDataSetId = Array.from(
      document.querySelectorAll(`[data-id="${id}"]`)
    );
    elementByDataSetType = Array.from(
      document.querySelectorAll(`[data-type="edit"]`)
    );
    elInput = elementByDataSetId.find((el) => "input" === el.dataset.type);
    elTitle = elementByDataSetId.find((el) => "title" === el.dataset.type);
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
  elementByDataSetId.forEach((el) => {
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
  elementByDataSetType.forEach((el) => {
    if (el.dataset.id !== id) {
      el.setAttribute("disabled", "disabled");
    }
  });
}

function closeEdit(id) {
  elementByDataSetId.forEach((el) => {
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
  elementByDataSetType.forEach((el) => {
    if (el.dataset.id !== id) {
      el.removeAttribute("disabled");
    }
  });
}
