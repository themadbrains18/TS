"use client"
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import useToggle from "@/hooks/useToggle";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setModalOpen(true)}>Hello!</Button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <h2 className="text-lg font-semibold">Are you sure?</h2>
          <p className="text-sm">This action cannot be undone.</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button onClick={() => setModalOpen(false)} className="btn btn-outline">
              Cancel
            </button>
            <button className="btn btn-primary">Continue</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
