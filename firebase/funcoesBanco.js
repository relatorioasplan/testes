function LerBD() {
    var url = 'https://opensheet.elk.sh/19m-nYHiUQW5Vvo38F21mGqkoLViLTv4etur92_zI4cU/Dados'; // ou https://opensheet.elk.sh/a09rksjodf[...]/Minhaaba
    fetch(url).then(response => response.json()).then((dados) => {

        //console.table(dados);
        Processa(dados);

    });

}

function Processa(MeusDados) {
    var tamanhoTabela = MeusDados.length;
    var municipio_tela = document.getElementById("municipio").value;

    if (municipio_tela == "") {
        //Validação para nao ter municipio vazio na tela
    }
    else {
        let MUNICIPIO;
        let PROCESSO;
        let CONVENENTE;
        let PROGRAMA;
        let MODALIDADE;
        let BAIRRO;
        let OBJETO;
        let DATA_DE_VIGENCIA;
        let SITUACAO_DA_OBRA;
        let QUANT_PREVISTA;
        let ENCAMINHAMENTO_PARA_SOLUCAO;
        let QUANT_DE_PARCELAS_REALIZADAS_BENEFICIARIOS_CADASTRADOS;
        let VALOR_TOTAL_DA_OBRA_PREVISTO_RS;
        let RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS;
        let RECURSO_ESTADUAL_PREVISTO_RS;
        let RECURSO_ESTADUAL_ENTREGUE;
        let IRREGULARIDADE;
        let ACAO2;
        let controle = 0;
        var stringEmenda = "";

        document.getElementById("relatorio").value = ""; // limpa tela  

        let teste = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
        //Verificação se pega do ultimo relaotorio (1) - ou dados da planilha (0)
        if (teste === "0") {
            document.getElementById("relatorio").value += "*" + municipio_tela + "*\n";
            document.getElementById("relatorio").value += "\n_Crédito Parceria_\n";
            //FOR //IF
            for (let i = 0; i < tamanhoTabela; i++) {//tamanhoTabela
                MUNICIPIO = MeusDados[i]['MUNICIPIO'];
                if (MUNICIPIO == municipio_tela) {
                    PROGRAMA = MeusDados[i]['PROGRAMA'];
                    if (PROGRAMA != 'ALUGUEL SOCIAL' && PROGRAMA != 'GOIÁS SOCIAL' && PROGRAMA != 'CONSTRUÇÃO EMENDA PARLAMENTAR' && PROGRAMA != 'REFORMA EMENDA PARLAMENTAR') {
                        DATA_DE_VIGENCIA = MeusDados[i]['DATA DE VIGÊNCIA'];
                        if (DATA_DE_VIGENCIA !== undefined) {
                            let arrDATA_DE_VIGENCIA = DATA_DE_VIGENCIA.split("/");
                            SITUACAO_DA_OBRA = MeusDados[i]['SITUACAO DA OBRA'];
                            if (arrDATA_DE_VIGENCIA[2] >= 2019 || SITUACAO_DA_OBRA == "EM ANDAMENTO" || SITUACAO_DA_OBRA == "PARALISADA" || SITUACAO_DA_OBRA == "SOBRESTADO") {
                                controle = 1;
                                PROCESSO = MeusDados[i]['PROCESSO'];
                                CONVENENTE = MeusDados[i]['CONVENENTE'];
                                MODALIDADE = MeusDados[i]['MODALIDADE'];
                                BAIRRO = MeusDados[i]['BAIRRO'];
                                OBJETO = MeusDados[i]['OBJETO'];
                                QUANT_PREVISTA = MeusDados[i]['QUANT. PREVISTA'];
                                ENCAMINHAMENTO_PARA_SOLUCAO = MeusDados[i]['ENCAMINHAMENTO PARA SOLUÇÃO '];
                                QUANT_DE_PARCELAS_REALIZADAS_BENEFICIARIOS_CADASTRADOS = MeusDados[i]['QUANT. DE PARCELAS REALIZADAS / BENEFICIÁRIOS CADASTRADOS'];
                                VALOR_TOTAL_DA_OBRA_PREVISTO_RS = MeusDados[i]['VALOR TOTAL DA OBRA - PREVISTO - R$'];
                                RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS = MeusDados[i]['RECURSO FEDERAL/MUNICIPAL/OSC - PREVISTO - R$'];
                                RECURSO_ESTADUAL_PREVISTO_RS = MeusDados[i]['RECURSO ESTADUAL - PREVISTO - R$'];
                                RECURSO_ESTADUAL_ENTREGUE = MeusDados[i]['RECURSO ESTADUAL ENTREGUE - R$'];
                                IRREGULARIDADE = MeusDados[i]['IRREGULARIDADE'];
                                ACAO2 = MeusDados[i]['AÇÃO2'];

                                let tamanho = SITUACAO_DA_OBRA.length;
                                let tranforma = SITUACAO_DA_OBRA.toLocaleLowerCase().slice(1, tamanho);
                                let aux = SITUACAO_DA_OBRA[0].toLocaleUpperCase() + tranforma;

                                if (arrDATA_DE_VIGENCIA[2] < 2019) {
                                    document.getElementById("relatorio").value += "\n*Anterior à gestão atual - Ano de vigência: " + arrDATA_DE_VIGENCIA[2];
                                }

                                document.getElementById("relatorio").value += "\n" + aux + "\n";
                                document.getElementById("relatorio").value += PROCESSO + "\n";

                                if (MODALIDADE != "COMUNITÁRIO") {

                                    if (QUANT_PREVISTA > 1) {
                                        document.getElementById("relatorio").value += BAIRRO + " - " + OBJETO + " PREVISTAS\n";
                                        if (SITUACAO_DA_OBRA == "CONCLUÍDA" || SITUACAO_DA_OBRA == "ENTREGUE") {
                                            document.getElementById("relatorio").value += "Concluído/Entregue: " + QUANT_DE_PARCELAS_REALIZADAS_BENEFICIARIOS_CADASTRADOS + " UHs\n";
                                        }
                                    }
                                    else {
                                        document.getElementById("relatorio").value += BAIRRO + " - " + OBJETO + " PREVISTA\n";
                                        if (SITUACAO_DA_OBRA == "CONCLUÍDA" || SITUACAO_DA_OBRA == "ENTREGUE") {
                                            document.getElementById("relatorio").value += "Concluído/Entregue: " + QUANT_DE_PARCELAS_REALIZADAS_BENEFICIARIOS_CADASTRADOS + " UH\n";
                                        }
                                    }

                                }
                                else {
                                    document.getElementById("relatorio").value += BAIRRO + " - " + OBJETO + "\n";
                                }
                                if (RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS == "R$ 0,00" || RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS == "(vazio)" || RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS == undefined) {
                                    document.getElementById("relatorio").value += "Valor total/valor estadual previsto: " + RECURSO_ESTADUAL_PREVISTO_RS + "\n";
                                    document.getElementById("relatorio").value += "Valor total/valor estadual entregue: " + RECURSO_ESTADUAL_ENTREGUE + "\n";
                                }
                                else {
                                    document.getElementById("relatorio").value += "Valor Total: " + VALOR_TOTAL_DA_OBRA_PREVISTO_RS + "\n";
                                    document.getElementById("relatorio").value += "Valor estadual previsto: " + RECURSO_ESTADUAL_PREVISTO_RS + "\n";
                                    document.getElementById("relatorio").value += "Valor estadual entregue: " + RECURSO_ESTADUAL_ENTREGUE + "\n";
                                    document.getElementById("relatorio").value += "Valor contrapartida: " + RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS + "\n";
                                }
                                document.getElementById("relatorio").value += "Convenente: " + CONVENENTE + "\n";
                                document.getElementById("relatorio").value += '*' + ENCAMINHAMENTO_PARA_SOLUCAO + "\n";
                                document.getElementById("relatorio").value += '*' + IRREGULARIDADE + "\n";
                                document.getElementById("relatorio").value += '*' + ACAO2 + "\n";

                            }
                        }

                    }
                    else if (PROGRAMA == 'CONSTRUÇÃO EMENDA PARLAMENTAR' || PROGRAMA == 'REFORMA EMENDA PARLAMENTAR') {
                        controle = 1;
                        SITUACAO_DA_OBRA = MeusDados[i]['SITUACAO DA OBRA'];
                        PROCESSO = MeusDados[i]['PROCESSO'];
                        CONVENENTE = MeusDados[i]['CONVENENTE'];
                        BAIRRO = MeusDados[i]['BAIRRO'];
                        OBJETO = MeusDados[i]['OBJETO'];
                        ENCAMINHAMENTO_PARA_SOLUCAO = MeusDados[i]['ENCAMINHAMENTO PARA SOLUÇÃO '];
                        QUANT_DE_PARCELAS_REALIZADAS_BENEFICIARIOS_CADASTRADOS = MeusDados[i]['QUANT. DE PARCELAS REALIZADAS / BENEFICIÁRIOS CADASTRADOS'];
                        VALOR_TOTAL_DA_OBRA_PREVISTO_RS = MeusDados[i]['VALOR TOTAL DA OBRA - PREVISTO - R$'];
                        RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS = MeusDados[i]['RECURSO FEDERAL/MUNICIPAL/OSC - PREVISTO - R$'];
                        RECURSO_ESTADUAL_PREVISTO_RS = MeusDados[i]['RECURSO ESTADUAL - PREVISTO - R$'];
                        RECURSO_ESTADUAL_ENTREGUE = MeusDados[i]['RECURSO ESTADUAL ENTREGUE - R$'];
                        IRREGULARIDADE = MeusDados[i]['IRREGULARIDADE'];
                        ACAO2 = MeusDados[i]['AÇÃO2'];

                        let tamanho = SITUACAO_DA_OBRA.length;
                        let tranforma = SITUACAO_DA_OBRA.toLocaleLowerCase().slice(1, tamanho);
                        let aux = SITUACAO_DA_OBRA[0].toLocaleUpperCase() + tranforma;

                        stringEmenda = "\n_Emenda Parlamentar_\n\n"
                            + aux + "\n"
                            + PROCESSO + "\n"
                            + BAIRRO + " - "
                            + OBJETO + "\n"
                            + "Valor total/valor estadual previsto: " + RECURSO_ESTADUAL_PREVISTO_RS + "\n"
                            + "Valor total/valor estadual entregue: " + RECURSO_ESTADUAL_ENTREGUE + "\n"
                            + "Convenente: " + CONVENENTE + "\n"
                            + ENCAMINHAMENTO_PARA_SOLUCAO + "\n"
                            + IRREGULARIDADE + "\n"
                            + ACAO2 + "\n";
                    }
                }
            } if (controle == 0) {
                document.getElementById("relatorio").value += "Não constam obras\n";
            }
            document.getElementById("relatorio").value += stringEmenda;
            //---------------------------AluguelSocial---------------------------
            // 
            // let dbRef = firebase.database().ref();
            // dbRef.child("/Relatorio").child(municipio_tela).child("AluguelSocial").get().then((snapshot) => {
            //     if (snapshot.exists()) {
            //         let TextoAluguelSocial = snapshot.val();
            //         let arrAluguelSocial = TextoAluguelSocial.split("&");
            //         document.getElementById("relatorio").value += "\n_Aluguel Social_\n";
            //         for (let i = 0; i < arrAluguelSocial.length - 1; i++) {
            //             document.getElementById("relatorio").value += arrAluguelSocial[i] + "\n";
            //         }

            //     }
            //     else {
            //         document.getElementById("relatorio").value += "\n_Aluguel Social_\n\n";
            //     }
            // })
            //---------------------------GoiasSocial---------------------------
            // dbRef.child("/Relatorio").child(municipio_tela).child("GoiasSocial").get().then((snapshot) => {
            //     if (snapshot.exists()) {
            //         var TextoGoiasSocial = snapshot.val();
            //         var arrTextoGoiasSocial = TextoGoiasSocial.split("&");
            //         document.getElementById("relatorio").value += "_Goiás Social_\n";
            //         for (let i = 0; i < arrTextoGoiasSocial.length - 1; i++) {
            //             document.getElementById("relatorio").value += arrTextoGoiasSocial[i] + "\n";
            //         }

            //     }
            //     else {
            //         document.getElementById("relatorio").value += "\n_Goiás Social_\n\n";

            //     }
            // })

            // Aluguel Social
            AluguelSocial(municipio_tela);


        }

        else {//Banco de dados
            let dbRef = firebase.database().ref();

            dbRef.child("/Relatorio").child(municipio_tela).child("DataRelatorio").get().then((snapshot) => {
                if (snapshot.exists()) {
                    let TextoDataRelatorio = snapshot.val();
                    document.getElementById("relatorio").value += "*" + municipio_tela + "* - " + TextoDataRelatorio + "\n";
                    document.getElementById("relatorio").value += "\n_Crédito Parceria_\n";
                }
                else {
                    document.getElementById("relatorio").value += "*" + municipio_tela + "* - " + "Sem relatório salvo para este município\n";
                }
            })

            dbRef.child("/Relatorio").child(municipio_tela).child("CreditoParceria").get().then((snapshot) => {
                if (snapshot.exists()) {
                    let TextoCredito = snapshot.val();
                    let arrTextoCredito = TextoCredito.split("&");
                    for (let i = 0; i < arrTextoCredito.length - 1; i++) {
                        document.getElementById("relatorio").value += arrTextoCredito[i] + "\n";
                    }

                }
            })

            dbRef.child("/Relatorio").child(municipio_tela).child("AluguelSocial").get().then((snapshot) => {
                if (snapshot.exists()) {
                    let TextoAluguelSocial = snapshot.val();
                    let arrAluguelSocial = TextoAluguelSocial.split("&");
                    document.getElementById("relatorio").value += "_Aluguel Social_\n";
                    for (let i = 0; i < arrAluguelSocial.length - 1; i++) {
                        document.getElementById("relatorio").value += arrAluguelSocial[i] + "\n";
                    }

                }

            })

            dbRef.child("/Relatorio").child(municipio_tela).child("GoiasSocial").get().then((snapshot) => {
                if (snapshot.exists()) {
                    let TextoGoiasSocial = snapshot.val();
                    let arrTextoGoiasSocial = TextoGoiasSocial.split("&");
                    document.getElementById("relatorio").value += "_Goiás Social_\n";
                    for (let i = 0; i < arrTextoGoiasSocial.length - 1; i++) {
                        document.getElementById("relatorio").value += arrTextoGoiasSocial[i] + "\n";
                    }

                }
            })


        }

    }
}

function salvarBD() {
    if (document.getElementById("relatorio").value != "") {
        let AluguelSocial = "";
        let CreditoParceria = "";
        let GoiasSocial = "";
        let Municipio = document.getElementById("municipio").value;
        let date = new Date();
        let DataRelatorio = date.toLocaleDateString();
        let texto = document.getElementById("relatorio").value;
        let arrTexto = texto.split("\n");
        let posicaoCreditoParceria = arrTexto.indexOf('_Crédito Parceria_');
        let posicaoAluguelSocial = arrTexto.indexOf('_Aluguel Social_');
        let posicaoGoiasSocial = arrTexto.indexOf('_Goiás Social_');
        console.log(arrTexto);
        console.log(posicaoCreditoParceria);
        console.log(posicaoAluguelSocial);
        console.log(posicaoGoiasSocial);

        for (let i = posicaoCreditoParceria + 1; i < posicaoAluguelSocial; i++) {
            CreditoParceria += arrTexto[i] + "&";
        }

        for (let i = posicaoAluguelSocial + 1; i < posicaoGoiasSocial; i++) {
            AluguelSocial += arrTexto[i] + "&";
        }

        for (let i = posicaoGoiasSocial + 1; i < arrTexto.length; i++) {
            GoiasSocial += arrTexto[i] + "&";
        }

        const db = {
            AluguelSocial: AluguelSocial,
            CreditoParceria: CreditoParceria,
            GoiasSocial: GoiasSocial,
            Municipio: Municipio,
            DataRelatorio: DataRelatorio
        };
        let Relatorio_id = Municipio;
        let updates = {};
        updates['/Relatorio/' + Relatorio_id] = db;
        let relatorio_ref = firebase.database().ref();
        relatorio_ref.update(updates)
            .then(function () {
                return { success: true, message: 'Dados Salvos' };
            })
            .catch(function (error) {
                return { success: false, message: `Erro, dados nao salvos: ${error.message}` };
            });

        popup("Dados salvos");
    }
    else {
        popup("erro, sem dados para salvar");
    }
}

function AluguelSocial(AluguelCidade) {
    let url = 'https://opensheet.elk.sh/1gCMhFXflTvrqpadMxtmSv-jnhNRM8L5wBksYzZasS84/ResumidoMeggieSiteLuis'; // ou https://opensheet.elk.sh/a09rksjodf[...]/Minhaaba
    fetch(url).then(response => response.json()).then((dados) => {
        let MUNICIPIO;
        let temAluguel = 0;
        document.getElementById("relatorio").value += "\n_Aluguel Social_\n";
        for (let i = 2; i < dados.length; i++) {//tamanhoTabela
            MUNICIPIO = dados[i]['Cidade'];

            if (MUNICIPIO.toLocaleUpperCase() == AluguelCidade) {
                temAluguel = 1;

                let inscricao = dados[i]["Status das Incrições"];
                if (inscricao == "Suspensas") { //SUSPENSO
                    document.getElementById("relatorio").value += "Inscrições Suspensas\n";
                    let QuantEntregue = dados[i]["Quantidade de cartões entregues"];
                    let CadastroApro = dados[i]["Cadastro aprovado"];
                    let EmAnalise = dados[i]["Em análise"];
                    let ProximoEvento = dados[i]["Próximo evento"];
                    if (QuantEntregue == CadastroApro && ProximoEvento == 0 && EmAnalise == 0) {
                        document.getElementById("relatorio").value += "Não há inscrições pendentes de analise\n";
                        if (QuantEntregue > 0) {
                            document.getElementById("relatorio").value += QuantEntregue + " cartões entregues\n";
                        }
                    }
                    else {
                        if (ProximoEvento > 0) {
                            document.getElementById("relatorio").value += "Aguardando agenda para entrega dos cartões\n";
                            if (QuantEntregue > 0) {
                                document.getElementById("relatorio").value += QuantEntregue + " cartões entregues\n";
                            }
                        }
                    }


                }
                else {
                    let QuantEntregue = dados[i]["Quantidade de cartões entregues"];
                    document.getElementById("relatorio").value += "inscrições abertas\n";
                    if (QuantEntregue > 0) {
                        document.getElementById("relatorio").value += QuantEntregue + " cartões entregues\n";
                    }
                }
                return GoiasSocial(AluguelCidade);;
            }
        }
        if (!temAluguel) {
            document.getElementById("relatorio").value += "Não constam editais/inscrições abertas\n";
        }
        GoiasSocial(AluguelCidade);
    });
}

function GoiasSocial(CidadeSocial) {
    document.getElementById("relatorio").value += "\n_Goiás Social_\n";
    let url;

    url = 'https://opensheet.elk.sh/1TVFnP_YU-6TVXPkh2RYI_1vjiN6TCEB6O9Jg6IS3FGI/1ªEtapa'; // ou https://opensheet.elk.sh/a09rksjodf[...]/Minhaaba
    fetch(url).then(response => response.json()).then((dados) => {
        // dados
        //console.log("chegou aqui");
        for (let i = 0; i < dados.length; i++) {
            if (dados[i]["CIDADE"] == CidadeSocial) {

                document.getElementById("relatorio").value += "\n1ªEtapa\n";
                if ((dados[i]["Municipio"] != dados[i]["CIDADE"])) {
                    let aux = dados[i]["Municipio"].split(dados[i]["CIDADE"]);
                    document.getElementById("relatorio").value += "\n" + aux[1] + "\n";
                }
                document.getElementById("relatorio").value += dados[i]["UHs"] + "UHs - " + dados[i]["Valor contrato"] + "\n";
                document.getElementById("relatorio").value += dados[i]["ESTÁGIO ATUAL DA OBRA"] + "\n";

                if ((dados[i + 1]["CIDADE"] != CidadeSocial)) {
                    return;
                }
                else {
                    do {
                        i++;
                        let aux = dados[i]["Municipio"].split(dados[i]["CIDADE"]);
                        document.getElementById("relatorio").value += "\n" + aux[1] + "\n";
                        document.getElementById("relatorio").value += dados[i]["UHs"] + "UHs - " + dados[i]["Valor contrato"] + "\n";
                        document.getElementById("relatorio").value += dados[i]["ESTÁGIO ATUAL DA OBRA"] + "\n";
                    } while ((dados[i + 1]["CIDADE"] == CidadeSocial))
                }
            }
        }

    });
    url = 'https://opensheet.elk.sh/1TVFnP_YU-6TVXPkh2RYI_1vjiN6TCEB6O9Jg6IS3FGI/2ªEtapa'; // ou https://opensheet.elk.sh/a09rksjodf[...]/Minhaaba
    fetch(url).then(response => response.json()).then((dados) => {
        for (let i = 0; i < dados.length; i++) {
            debugger;
            if (dados[i]["CIDADE"] == CidadeSocial) {

                document.getElementById("relatorio").value += "\n2ªEtapa\n";
                if ((dados[i]["Municipio"] != dados[i]["CIDADE"])) {
                    let aux = dados[i]["Municipio"].split(dados[i]["CIDADE"]);
                    document.getElementById("relatorio").value += "\n" + aux[1] + "\n";
                }
                document.getElementById("relatorio").value += dados[i]["UHs"] + "UHs - " + dados[i][" Valor contrato "] + "\n";
                document.getElementById("relatorio").value += dados[i]["ESTÁGIO ATUAL DA OBRA"] + "\n";

                if ((dados[i + 1]["CIDADE"] != CidadeSocial)) {
                    return;
                }
                else {
                    do {
                        i++;
                        let aux = dados[i]["Municipio"].split(dados[i]["CIDADE"]);
                        document.getElementById("relatorio").value += "\n" + aux[1] + "\n";
                        document.getElementById("relatorio").value += dados[i]["UHs"] + "UHs - " + dados[i][" Valor contrato "] + "\n";
                        document.getElementById("relatorio").value += dados[i]["ESTÁGIO ATUAL DA OBRA"] + "\n";
                    } while ((dados[i + 1]["CIDADE"] == CidadeSocial))
                }
            }
        }
    });
    url = 'https://opensheet.elk.sh/1TVFnP_YU-6TVXPkh2RYI_1vjiN6TCEB6O9Jg6IS3FGI/3ªEtapa'; // ou https://opensheet.elk.sh/a09rksjodf[...]/Minhaaba
    fetch(url).then(response => response.json()).then((dados) => {
        for (let i = 0; i < dados.length; i++) {
            debugger;
            if (dados[i]["CIDADE"] == CidadeSocial) {

                document.getElementById("relatorio").value += "\n3ªEtapa\n";
                if ((dados[i]["Municipio"] != dados[i]["CIDADE"])) {
                    let aux = dados[i]["Municipio"].split(dados[i]["CIDADE"]);
                    document.getElementById("relatorio").value += "\n" + aux[1] + "\n";
                }
                document.getElementById("relatorio").value += dados[i]["UHs"] + "UHs - " + dados[i][" Valor contrato "] + "\n";
                document.getElementById("relatorio").value += dados[i]["ESTÁGIO ATUAL DA OBRA"] + "\n";

                if ((dados[i + 1]["CIDADE"] != CidadeSocial)) {
                    return;
                }
                else {
                    do {
                        i++;
                        let aux = dados[i]["Municipio"].split(dados[i]["CIDADE"]);
                        document.getElementById("relatorio").value += "\n" + aux[1] + "\n";
                        document.getElementById("relatorio").value += dados[i]["UHs"] + "UHs - " + dados[i][" Valor contrato "] + "\n";
                        document.getElementById("relatorio").value += dados[i]["ESTÁGIO ATUAL DA OBRA"] + "\n";
                    } while ((dados[i + 1]["CIDADE"] == CidadeSocial))
                }
            }
        }
    });
}
