from flask import Flask, jsonify
import mysql.connector

servico = Flask(__name__)

DEBUG = True

MYSQL_SERVER = "10.0.0.117"
MYSQL_USER = "root"
MYSQL_PASS = "m4rc4s"
MYSQL_BANCO = "marcas"


def get_conexao_bd():
    conexao = mysql.connector.connect(
        host=MYSQL_SERVER, port=4000, user=MYSQL_USER, password=MYSQL_PASS, database=MYSQL_BANCO)

    return conexao


def gerar_agendamento(registro):
    agendamento = {
        "_id": registro["id"],
        "data": registro["data"],
    }

    return agendamento

@servico.route("/adicionar/<string:agendamento>")
def adicionar(data):
    resultado = jsonify(situacao="ok", erro="")

    conexao = get_conexao_bd()
    cursor = conexao.cursor()

    try:
        cursor.execute(
            "insert into agendamento(data) " +
            f"values ({data})"
        )
        conexao.commit()
    except Exception as e:
        conexao.rollback()
        # TODO alem de retornar a mensagem de erro, o erro deve ser guardado em log pelo servico
        resultado = jsonify(
            situacao="erro", erro="erro adicionando horario: " + str(e))

    return resultado




if __name__ == "__main__":
    servico.run(
        host="0.0.0.0",
        port=5005,
        debug=DEBUG
    )
