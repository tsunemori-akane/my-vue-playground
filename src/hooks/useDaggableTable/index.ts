import { useEventListener } from "@vueuse/core";
import { reactive } from "vue";

let table: HTMLTableElement
let tbody:any
let allRows: HTMLTableRowElement[]
let multiDragElements: HTMLTableRowElement[] = []
let curRow: HTMLTableRowElement
let curSiblingItem: HTMLTableRowElement
let sortClassName: string = ""
let unSortClassName: string = ""
let needReexpand: boolean = true
export const oldnNewIndex = reactive({
  oldIndex: -1,
  newIndex: -1,
  flag: true,
})

export default function init(el: HTMLTableElement, cn: string, unSortCn:string) {
  table = el
  tbody = el.querySelector("tbody")
  sortClassName = cn
  unSortClassName = unSortCn
  allRows = Array.from(table.getElementsByClassName(sortClassName)) as HTMLTableRowElement[]
  allRows.forEach((el: Element) => {
    el.setAttribute("draggable", "true")
  })
  bindEvent()
}

function findIndex(el: Element | null, className: string) {
  let index = 0;
  if(!el) {
    return -1
  }
  while ((el = el.previousElementSibling)) {
    if(el.classList.value.includes(className)) {
      index ++
    }
  }
  return index
}

function getTargetRows(target: HTMLElement): HTMLTableRowElement[] {
  let tar = target.closest("tr")
  if(!tar?.classList.value.includes(sortClassName)) return []
  multiDragElements.push(tar)
  while(tar?.nextElementSibling && tar?.nextElementSibling?.classList.value.includes(unSortClassName)) {
    tar = tar.nextElementSibling as HTMLTableRowElement
    multiDragElements.push(tar)
  }
  if(multiDragElements.length > 1 && multiDragElements[1].style.display === "none") {
    needReexpand = false
  } else {
    needReexpand = true
  }
  return multiDragElements;
}

function setDisplayChild(status?: boolean) {
  for(let i = 0; i < multiDragElements.length; i++) {
    if(i > 0) {
      if(status) {
        multiDragElements[i].style.display = "none";
      } else if(needReexpand) {
        multiDragElements[i].style.display = "table-row";
      }
    }
  }
}

function handleDragStart(event: DragEvent) {
  const arr = getTargetRows(event.target as HTMLElement)
  if(arr.length === 0) return
  curRow = arr[0]

  curRow.classList.add("dragging-row")
  setDisplayChild(true)
  oldnNewIndex.oldIndex = findIndex((event.target as Element).closest("tr"), sortClassName)
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  e.dataTransfer!.dropEffect = "move"
  const siblingItems = table.querySelectorAll(`.${sortClassName}:not(.dragging-row)`)
  const sibItem = [...siblingItems].find((item: Element) => {
    const itemPos = item.getBoundingClientRect();
    return e.clientY <= itemPos.y + itemPos.height / 2
  })
  if(sibItem === curSiblingItem) {
    return
  } else {
    curSiblingItem = sibItem as unknown as HTMLTableRowElement;
  }

  const fragment = new DocumentFragment()
  for(const item of multiDragElements) {
    fragment.append(item)
  }
  tbody.insertBefore(fragment, sibItem!);
}

function handleDragEnd(e: DragEvent) {
  e.stopPropagation()
  setDisplayChild(false)
  multiDragElements = []
  curRow.classList.remove("dragging-row")
  oldnNewIndex.newIndex = findIndex((e.target as Element).closest("tr"), sortClassName)
  oldnNewIndex.flag = !oldnNewIndex.flag
}

function bindEvent() {
  allRows.forEach(function (item) {
    useEventListener(item, "dragstart", handleDragStart);
    useEventListener(item, "dragover", handleDragOver);
    useEventListener(item, "dragend", handleDragEnd);
  })
}
