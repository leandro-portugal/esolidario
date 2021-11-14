function clean_form_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('street').value=("");
    document.getElementById('neighborhood').value=("");
    document.getElementById('city').value=("");
    document.getElementById('state').value=("");
    
}

function my_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('street').value=(conteudo.logradouro);
        document.getElementById('neighborhood').value=(conteudo.bairro);
        document.getElementById('city').value=(conteudo.localidade);
        document.getElementById('state').value=(conteudo.uf);
       
    } //end if.
    else {
        //CEP não Encontrado.
        clean_form_cep();
        alert("CEP não encontrado.");
    }
}

function codeSearch(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('street').value="...";
            document.getElementById('neighborhood').value="...";
            document.getElementById('city').value="...";
            document.getElementById('state').value="...";
           

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=my_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            clean_form_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        clean_form_cep();
    }
}




