import type { IDialogElement } from '../types'

export class dialogHelper {
  target: IDialogElement | null

  constructor(target: string) {
    this.target = document.getElementById(target) as IDialogElement | null
  }

  open() {
    this.target?.removeAttribute('inert')
    this.target?.showModal()
  }

  close() {
    this.target?.close()
    this.target?.setAttribute('inert', '')
  }

  closeOnBackdropClick(e: MouseEvent) {
    if ((e.target as any).nodeName === 'DIALOG') {
      this.close()
    }
  }
}

export const infoDialog = new dialogHelper('info-modal')
