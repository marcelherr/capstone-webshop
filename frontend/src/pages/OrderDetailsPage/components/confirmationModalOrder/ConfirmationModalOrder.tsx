import {Order} from "../../../../types/types.tsx";

type ModalProps = {
    handleClose: () => void,
    handleDeleteConfirm: () => void,
    orderToBeDeleted: Order
}

export default function ConfirmationModalOrder({
                                                   handleClose,
                                                   handleDeleteConfirm,
                                                   orderToBeDeleted
                                               }: Readonly<ModalProps>) {
    return (
        <div className={"modal-backdrop"}>
            <div className={"modal"}>
                <div className={"modal-body"}>
                    <h2 className={"modal-body-title"}>Delete Order</h2>
                    <h4 className={"modal-body-message"}>Are you sure you want to delete </h4>
                    <h4>{orderToBeDeleted.id} ?</h4>
                </div>
                <div className={"modal-buttons"}>
                    <button className={"close-btn"} onClick={handleClose}>No, cancel</button>
                    <button className={"delete-btn"} onClick={handleDeleteConfirm}>Yes, delete!</button>
                </div>
            </div>
        </div>
    )
}