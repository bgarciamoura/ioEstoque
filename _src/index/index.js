var Datastore = require('nedb')

var db = new Datastore({filename: '_db/dbEstoque.db', autoload: true})

var prod = [
    {
        id: 1,
        nome: 'Tenis',
        quantidade: 12,
        valor: 125.50
    },
    {
        id: 2,
        nome: 'Caneta',
        quantidade: 250,
        valor: 1.50
    },
    {
        id: 3,
        nome: 'Apontador',
        quantidade: 10,
        valor: 0.50
    }
]

db.remove({}, {multi: true}, function (err, numRemoved) {
    // numRemoved = 1
})

db.insert(prod, function(err, newProd) {

})

db.find( {id:2} , function(err, docs) {
    console.log('Registros')
    console.log(docs)
})

var linhaSelecionada
$(document).ready(function(){
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    // MASCARA DE DINHEIRO DA LIB JQUERY-MASK-PLUGIN
    $('.dinheiro').mask('#.##0,00', {reverse: true})

    // SALVAR PRODUTO NOVO DO MODAL
    $('#btnSalvar').click(function save() {
        var newRow = $('<tr>')
        var cols = ""
        // PEGA A ULTIMA LINHA E ADICIONA EM UMA VARIAVEL
        // EM SEGUIDA, ATRIBUI O VALOR DO ID DA LINHA A UMA VARIAVEL
        var linha = $("#tblProdutos tr:last")
        var id = parseInt($(linha[0]).text())
        // VERIFICA SE O ID NÃO É NULO OU NaN
        if (id == null || isNaN(id)) {
            id = 1
        } else {
            id++
        }

        // CRIA UMA NOVA LINHA COM OS DADOS INCLUSOS PELO MODAL
        cols += '<th scope="row">' + id.toString() + '</th>'
        cols += '<td>' + $('#txtNomeProduto').val() + '</td>'
        cols += '<td>' + $('#qtdProduto').val() + '</td>'
        cols += '<td class="dinheiro">' + 'R$ ' + $('#txtValorProduto').val() + '</td>'
        cols += '</tr>'
        newRow.append(cols)
        $('#tblProdutos').append(newRow)
        
        $('.modal').modal('hide')
    })

    $('#btnAddProduto').click(()=>{
        var newRow = $('<tr>')
        var cols = ""
        cols += '<td>' + $('#txtAddNome').val() + '</td>'
        cols += '<td>' + $('#qtdAddProduto').val() + '</td>'
        cols += '<td class="dinheiro">' + 'R$ ' + $('#txtAddValor').val() + '</td>'
        cols += '<td class="ml-4"><button class="btn btn-sm btn-primary">Alterar</button> <button class="btn btn-sm btn-danger">Excluir</button></td>'
        
        cols += '</tr>'
        newRow.append(cols)
        $('#tblAddProdutos').append(newRow)
    })

    $('.modal').on('hidden.bs.modal', function(){
        $('#txtNomeProduto').val('')
        $('#qtdProduto').val('')
        $('#txtValorProduto').val('')
    })

    // SELECIONAR LINHA NA TABELA
    $(document).on('click', 'tr', function(){
        $('tr').removeClass('selecionado')
        $(this).addClass('selecionado')
        linhaSelecionada = $(this).closest('tr')
        
    })
    
    $('#btnRemover').click(function(){
        
        linhaSelecionada.fadeOut(400, function(){
            linhaSelecionada.remove()
        })
    })

    $('#btnAlterar').click(() => {
        var colunas = linhaSelecionada.children()
        var valor = $(colunas[3]).text()
        var string = valor.replace('R$', '')
        $('#txtNomeProdutoAlt').val($(colunas[1]).text())
        $('#qtdProdutoAlt').val($(colunas[2]).text())
        $('#txtValorProdutoAlt').val(string)
        $('#btnSalvarAlt').click(()=> {
            $(colunas[1]).text($('#txtNomeProdutoAlt').val())
            $(colunas[2]).text($('#qtdProdutoAlt').val())
            $(colunas[3]).text('R$ ' + $('#txtValorProdutoAlt').val())
            $('.modal').modal('hide')
        })
    })

})