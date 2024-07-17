import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import { useState } from "react";
import Modal from "react-modal";
import { Toaster } from "sonner";

const Auths = ({ closeModal, modalIsOpen }) => {
  const [authPage, setAuthPage] = useState("Sign In");
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Confirm Authentication"
      ariaHideApp={false}
      className="flex items-center justify-center min-h-screen px-4 sm:px-0"
      overlayClassName="z-50 fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      {authPage === "Sign In" ? (
        <SignIn setAuthPage={setAuthPage} closeModal={closeModal} />
      ) : (
        <SignUp setAuthPage={setAuthPage} closeModal={closeModal} />
      )}

      <Toaster position="top-right" richColors />
    </Modal>
  );
};

export default Auths;
