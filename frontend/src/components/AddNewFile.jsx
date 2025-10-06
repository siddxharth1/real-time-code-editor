import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input
} from "@nextui-org/react";
import { useState } from "react";

export default function AddNewFile({ action }) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newFileName, setNewFileName] = useState("")

  return (
    <>
      <Button className="mb-3" onPress={onOpen}>New File +</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-white/10 text-white">
          {(onClose) => (
            <>
              <ModalBody>
                <div>File Name:</div>
                <Input value={newFileName} className="text-black" color="default" onChange={(e) => setNewFileName(e.target.value)} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {
                  action(newFileName)
                  setNewFileName("")
                  onClose()
                }}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
