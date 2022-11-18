import { useState } from 'react';
import { Modal, Platform, TouchableOpacity } from 'react-native';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { ModalBody, ModalForm, ModalHeader, ModalInput, Overlay } from './styles';

const isAndroid = Platform.OS === 'android';

interface TableModalProps{
  visible: boolean
  onClose: () => void
  onSave: (table: string) => void
}

export function TableModal({visible, onClose, onSave}: TableModalProps){

  const [table,  setTable]  = useState('');

  function handleTableInputChange(event: string ){
    setTable(event);
  }

  function handleSaveNewTable(){
    onSave(table);
    setTable('');
    onClose();
  }

  return(
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <Overlay behavior={isAndroid ? 'height' : 'padding' }>
        <ModalBody>
          <ModalHeader>
            <Text weight='600'>
              Informe a mesa
            </Text>

            <TouchableOpacity
              onPress={onClose}
            >
              <Close color="#666"/>
            </TouchableOpacity>
          </ModalHeader>

          <ModalForm>
            <ModalInput
              placeholder='Número da mesa'
              placeholderTextColor="#666"
              keyboardType='number-pad'
              value={table}
              onChangeText={event => handleTableInputChange(event)}
            />

            <Button
              onPress={() => handleSaveNewTable()}
              disable={table.length === 0}>
              Salvar
            </Button>
          </ModalForm>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
