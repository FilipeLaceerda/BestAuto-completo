from flask import Flask, jsonify
import mysql.connector

servico = Flask(__name__)

IS_ALIVE = "yes"
DEBUG = True
TAMANHO_PAGINA = 4

MYSQL_SERVER = "10.0.0.117"
MYSQL_USER = "root"
MYSQL_PASS = "m4rc4s"
MYSQL_BANCO = "marcas"


def get_conexao_bd():
    conexao = mysql.connector.connect(
        host=MYSQL_SERVER, port=4000, user=MYSQL_USER, password=MYSQL_PASS, database=MYSQL_BANCO)

    return conexao


def gerar_empresa(registro):
    empresa = {
        "_id": registro["id"],
        "name": registro["nome"],
        "avatar": registro["avatar"]
    }

    return empresa


@servico.route("/isalive")
def is_alive():
    return jsonify(alive=IS_ALIVE)


@servico.route("/empresas")
def get_empresas():
    empresas = []

    conexao = get_conexao_bd()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("select id, nome, avatar from empresas")
    resultado = cursor.fetchall()
    for registro in resultado:
        empresas.append(gerar_empresa(registro))

    return jsonify(empresas)


if __name__ == "__main__":
    servico.run(
        host="0.0.0.0",
        port=5001,
        debug=DEBUG
    )
