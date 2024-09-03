import './ConfirmationModal.css'
import {ProductWithNoId} from "../../types/types.tsx";

type ModalProps = {
    handleClose: () => void,
    handleDeleteConfirm: () => void,
    productToBeDeleted: ProductWithNoId
}

export default function ConfirmationModal({
                                              handleClose,
                                              handleDeleteConfirm,
                                              productToBeDeleted
                                          }: Readonly<ModalProps>) {
    return (
        <div className={"modal-backdrop"}>
            <div className={"modal"}>
                <div className={"modal-body"}>
                    <h2 className={"modal-body-title"}>Delete Book</h2>
                    <h4 className={"modal-body-message"}>Are you sure you want to delete </h4>
                    <h4>{productToBeDeleted.name}?</h4>
                </div>
                <div className={"modal-buttons"}>
                    <button className={"close-btn"} onClick={handleClose}>No, cancel</button>
                    <button className={"delete-btn"} onClick={handleDeleteConfirm}>Yes, delete!</button>
                </div>
            </div>
        </div>
    )
}