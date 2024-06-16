import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';

interface Props {
  children?: ReactNode; //선택
  title?: string; //선택
  desc: string; //필수
}

interface DialogElement {
  openModal: () => void;
  closeModal: () => void;
}

const Dialog = forwardRef<DialogElement, Props>((props, ref) => {
  const { children, title, desc } = props;
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => ({
    openModal: () => dialogRef.current?.showModal(),
    closeModal: () => dialogRef.current?.close(),
  }));

  //동작 : 어두운 바닥 클릭시 닫기
  const handleClose = (event: React.MouseEvent) => {
    if (dialogRef.current && event.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  };

  //텍스트 정렬 : title이 없을경우 desc 가운데 정렬
  const descClassName = `py-4 text-lg ${title ? '' : 'text-center'}`;

  return (
    <dialog ref={dialogRef} className="modal modal-middle" onClick={handleClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {title && <h3 className="text-lg font-bold">{title}</h3>}
        {desc && <p className={descClassName}>{desc}</p>}
        {children && <div>{children}</div>}
        <div className="modal-action mt-1 flex justify-center">
          <button
            type="button"
            className="btn w-full bg-primary text-base-100"
            onClick={() => dialogRef.current?.close()}
          >
            닫기
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default Dialog;
