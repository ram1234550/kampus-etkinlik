interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// Silmeden önce onay kutusu
function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="modal-arka" onClick={onCancel}>
      <div
        className="modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="onay-baslik"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="onay-baslik">Emin misiniz?</h2>
        <p>{message}</p>
        <p className="butonlar">
          <button type="button" className="buton-ikincil" onClick={onCancel} autoFocus>
            Vazgeç
          </button>
          <button type="button" className="buton-sil" onClick={onConfirm}>
            Evet, sil
          </button>
        </p>
      </div>
    </div>
  );
}

export default ConfirmDialog;
