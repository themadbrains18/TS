"use client"
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import useToggle from "@/hooks/useToggle";

export default function Home() {
  const [isToggled, toggle] = useToggle();

  return (
    <div>
      <Button onClick={toggle}>Hello!</Button>

      <Modal
        isOpen={isToggled}
        onClose={toggle}
        className="custom-modal"
        overlayClass="custom-overlay"
      >
        <h2 className="text-lg font-bold">Modal Title</h2>
        <p>This is the content of the modal.</p>
        <button onClick={toggle} className="btn">Close</button> {/* Call toggle to close */}
      </Modal>
    </div>
  );
}
