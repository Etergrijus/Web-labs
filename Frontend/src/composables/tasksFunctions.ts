import {ref} from "vue";

export function editing() {
  const isEdit = ref(false)
  const editButtonText = ref("Редактировать")

  const toggleEdit = (el: HTMLElement | null): void => {
    if (!el)
      return

    isEdit.value = !isEdit.value
    editButtonText.value = isEdit.value ? "Сохранить" : "Редактировать"
    el.contentEditable = String(isEdit.value)
  }

  return {isEdit, editButtonText, toggleEdit}
}
