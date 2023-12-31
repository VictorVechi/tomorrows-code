var cep = document.getElementById("cep")

cep.addEventListener("change", function (event) {
  let valor = verificarTraco(cep)
  if (valor.length == 8) {
    cep.style.border = "1px solid green"
    requisicao(valor)
  } else {
    cep.style.border = "1px solid red"
  }
});

function requisicao(cep) {
  try {
    $.ajax({
      url: `https://viacep.com.br/ws/${cep}/json/`,
      method: "GET",
      dataType: "json",
      success: function (result) {
        preencherCampos(result);
      },
      fail: function (error) {
        throw new Error("Erro na requisição")
      },
    });
  }
  catch (error) {
    console.log(error.message)
    alert(error.message)
  }
}

function verificarTraco(cep) {
  if (cep.value.indexOf("-") == -1) {
    return cep.value
  } else {
    cep.value = cep.value.replace("-", "")
    return cep.value
  }
}

function preencherCampos(obj) {
  document.getElementById("rua").value = obj.logradouro
  document.getElementById("bairro").value = obj.bairro
  document.getElementById("cidade").value = obj.localidade
  document.getElementById("estado").value = obj.uf
}