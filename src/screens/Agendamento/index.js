import React, {useState} from 'react';
import {View, Text, Modal} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Button} from 'react-native-elements/dist/buttons/Button';
import Icon from "react-native-vector-icons/AntDesign";

import {adicionarAgendamento, agendamentoAlive} from '../../api/index';
import {CentralizadoNaMesmaLinha, Espacador} from '../../assets/styles';
import {IsSignedIn} from '../../components/Login';

export function Agendamento() {
  const [data, setData] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [podeAgendar, setPodeAgendar] = useState(true);
  const [horarios, setHorarios] = useState([]);
  const [openGuildsModal, setOpenGuildsModal] = useState(false);

  agendar = () => {
    agendamentoAlive()
      .then(resultado => {
        if (resultado.alive === 'yes') {
          setPodeAgendar(true, () => {
            adicionarAgendamento(usuario, data)
              .then(resultado => {
                if (resultado.situacao == 'ok') {
                  setHorarios({
                    horarios: [],
                  });
                }
              })
              .catch(erro => {
                console.error('erro adicionando comentario: ' + erro);
              });
          });
        } else {
          setPodeAgendar(false);
        }
      })
      .catch(erro => {
        console.log('erro verificando a disponibilidade do servico: ' + erro);
      });

    this.mudarVisibilidadeTelaAdicao();
  };

  mudarVisibilidadeTelaAdicao = () => {
    const {telaAdicaoVisivel, setTelaAdicaoVisivel} = useState();

    setTelaAdicaoVisivel({telaAdicaoVisivel: !telaAdicaoVisivel});
  };

  mostrarTelaDeConfirmação = () => {
    setOpenGuildsModal(true);
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 18}}>Em qual data deseja marcar o serviço?</Text>
      <DatePicker
        style={{width: 300}}
        date={data}
        format="DD-MM-YYYY"
        maxDate="31-12-9999"
        onDateChange={setData}
        onPressMask={adicionarAgendamento}
      />
      <Text style={{fontSize: 18, marginTop: 350}}>
        O serviço está marcado para {data}
      </Text>

      <Modal visible={openGuildsModal}>
      <Text>Deseja confirmar essa data? {data}</Text>
      <CentralizadoNaMesmaLinha style={{marginTop: 150}}>
        <Button
          icon={<Icon name="check" size={22} color="#fff" />}
          title="Gravar"
          type="solid"
          onPress={() => {
            this.adicionarAgendamento();
          }}
        />
        <Espacador />
        <Button
          icon={<Icon name="closecircle" size={22} color="#fff" />}
          title="Cancelar"
          type="solid"
          onPress={() => {
            this.mudarVisibilidadeTelaAdicao();
          }}
        />
      </CentralizadoNaMesmaLinha>
      <Espacador />
    </Modal>
    </View>
  );
}

Agendamento.navigationOption = {
  title: 'Agendamento',
};
