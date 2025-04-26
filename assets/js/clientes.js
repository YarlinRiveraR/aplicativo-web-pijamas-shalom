const tableLista = document.querySelector("#tableListaProductos tbody");
const tblPendientes = document.querySelector('#tblPendientes');
let productosjson = [];
const estadoEnviado = document.querySelector('#estadoEnviado');
const estadoProceso = document.querySelector('#estadoProceso');
const estadoCompletado = document.querySelector('#estadoCompletado');
document.addEventListener("DOMContentLoaded", function() {
    if (tableLista) {
        getListaProductos();
    }
    //cargar datos pendientes con DataTables
    $('#tblPendientes').DataTable({
        ajax: {
            url: base_url + 'clientes/listarPendientes',
            dataSrc: ''
        },
        columns: [
            { data: 'id_transaccion' },
            { data: 'monto' },
            { data: 'fecha' },
            { data: 'accion' }
        ],
        language,
        dom,
        buttons

    });
});

function getListaProductos() {
    const miTalla = JSON.parse(localStorage.getItem('listaCarrito'));
    let html = '';
    const url = base_url + 'principal/listaProductos';
    const http = new XMLHttpRequest();
    http.open('POST', url, true);
    http.send(JSON.stringify(listaCarrito));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            if (res.totalPaypal > 0) {
                // Reemplazar el forEach con un bucle for
                for (let i = 0; i < res.productos.length; i++) {
                    const producto = res.productos[i];
                    html += `<tr>
                        <td>
                            <img class="img-thumbnail rounded-circle" src="${producto.imagen}" alt="" width="100">
                        </td>
                        <td>${producto.nombre}</td>
                        <td><span class="badge bg-warning">${res.moneda + ' ' + producto.precio}</span></td>
                        <td>${miTalla[i].talla}</td>
                        <td><span class="badge bg-primary"><h3>${producto.cantidad}</h3></span></td>
                        <td>${producto.subTotal}</td>
                    </tr>`;
                    
                }
                
                tableLista.innerHTML = html;
                document.querySelector('#totalProducto').textContent = 'TOTAL A PAGAR: ' + res.total + ' ' + res.moneda;
                botonEpayco(res.total, 'COP');
            } else {
                tableLista.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">CARRITO VACIO</td>
                </tr>
                `;
            }
        }
    }
}



function verPedido(idPedido) {
    estadoEnviado.classList.remove('bg-info');
    estadoProceso.classList.remove('bg-info');
    estadoCompletado.classList.remove('bg-info');
    const mPedido = new bootstrap.Modal(document.getElementById('modalPedido'));
    const url = base_url + 'clientes/verPedido/' + idPedido;
    const http = new XMLHttpRequest();
    http.open('GET', url, true);
    http.send();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            let html = '';
            if (res.pedido.proceso == 1) {
                estadoEnviado.classList.add('bg-info');
            } else if (res.pedido.proceso == 2) {
                estadoProceso.classList.add('bg-info');
            } else {
                estadoCompletado.classList.add('bg-info');
            }
            res.productos.forEach(row => {
                let subTotal = parseFloat(row.precio) * parseInt(row.cantidad);
                let precioFormato = formatearPeso(parseFloat(row.precio));
                let subTotalFormato = formatearPeso(subTotal);
                html += `<tr>
                    <td>${row.producto}</td>
                    <td><span class="badge bg-warning">${res.moneda + ' ' + precioFormato}</span></td>
                    <td><span class="badge bg-primary">${row.cantidad}</span></td>
                    <td>${subTotalFormato}</td>
                </tr>`;
            });
            document.querySelector('#tablePedidos tbody').innerHTML = html;
            mPedido.show();
        }
    }

}

function botonEpayco(total, moneda) {
    const contenedor = document.getElementById('epayco-button-container');

    const urlResponse = base_url + "Views/principal/epayco/respuesta.php";
    const urlConfirmation = base_url + "Views/principal/epayco/confirmacion.php";

    contenedor.innerHTML = `
      <epayco-button
          class="epayco-button"
          data-epayco-key="5b2e50243b90c07a57848c396e20afdb" 
          data-epayco-private-key="08d590039c53b1481b1b259b4adf962f"
          data-epayco-amount="${total}"
          data-epayco-tax-base="0"
          data-epayco-tax="0"
          data-epayco-name="Compra en Shalom Pijamas"
          data-epayco-description="Compra de productos en Shalom Pijamas"
          data-epayco-currency="${moneda}"
          data-epayco-button="Pagar con ePayco"
          data-epayco-country="co"
          data-epayco-test="true" 
          data-epayco-external="false"
          data-epayco-response="${urlResponse}"
          data-epayco-confirmation="${urlConfirmation}">
      </epayco-button>
    `;

    const scriptEl = document.createElement('script');
    scriptEl.src = "https://checkout.epayco.co/checkout.js";
    document.body.appendChild(scriptEl);
}