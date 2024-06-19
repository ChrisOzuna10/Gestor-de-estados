import Node from "./Node.mjs";

export default class Grafo {
    #head
    #count
    adjacencyMatrix
    constructor() {
        this.#head = null
        this.#count = 0
        this.adjacencyMatrix = []
    }
    add(value) {
        this.adjacencyMatrix.push(new Array(this.adjacencyMatrix.length + 1).fill(0))
        for (let i = 0; i < this.adjacencyMatrix.length; i++) {
            this.adjacencyMatrix[i].push(0)
        }
        let node = new Node(value)
        if (this.#head == null) {
            this.#head = node
            
        } else {
            let current = this.#head
            while (current.next != null) {
                current = current.next
            }
            current.next = node;
        }
        this.#count++
        return true
    }
    getElementAt(index) {
        if (index >= 0 && index < this.#count) {
            let node = this.#head
            for (let i = 0; i < index && node != null; i++) {
                node = node.next
            }
            return node
        }
        return null
    }
    agregarConexion(inicio, final, distancia) {
        if (inicio >= 0 && inicio < this.adjacencyMatrix.length && final >= 0 && final < this.adjacencyMatrix.length) {
            this.adjacencyMatrix[inicio][final] = distancia
            this.adjacencyMatrix[final][inicio] = distancia
            return true
        }
        return false
    }
    size(){
        return this.#count
    }
    
    busquedaProfundidad(metodo) {
        if(this.adjacencyMatrix.size == 0){
            alert("No hay elementos")
        }
        const visitados = new Array(this.adjacencyMatrix.length).fill(false)
        const pila = [0]
      
        while (pila.length) {
          const indice = pila.pop()
          if (!visitados[indice]) {
            visitados[indice] = true
            const nodo = this.getElementAt(indice)
            metodo(nodo.value)
      
            for (const vecino of this.getVecinos(indice)) {
              if (!visitados[vecino]) {
                pila.push(vecino)
              }
            }
          }
        }
      }
      
      getVecinos(indice) {
        const vecinos = []
        for (let i = 0; i < this.adjacencyMatrix.length; i++) {
          if (this.adjacencyMatrix[indice][i]!== 0) {
            vecinos.push(i)
          }
        }
        return vecinos
      }
      dijkstra(inicio, destino) {
        if (this.size === 0 ) {
            console.log("La lista está vacía.");
            return;
        }
    
        const distancia = new Array(this.adjacencyMatrix.length).fill(999999999);
        const previous = new Array(this.adjacencyMatrix.length).fill(null);
        const cola = [];
    
        distancia[inicio] = 0;
        cola.push(inicio);
    
        while (cola.length > 0) {
            let indiceActual = cola.shift();
            let distanciaActual = distancia[indiceActual];
    
            for (let i = 0; i < this.adjacencyMatrix.length; i++) {
                if (this.adjacencyMatrix[indiceActual][i] !== 0 && distancia[i] > distanciaActual + this.adjacencyMatrix[indiceActual][i]) {
                    distancia[i] = distanciaActual + parseInt(this.adjacencyMatrix[indiceActual][i]);
                    previous[i] = indiceActual;
                    cola.push(i);
                }
            }
        }
    
        const distanciaFinal = distancia[destino];
        let camino = [];
        let indiceActual = destino;
        while (indiceActual !== null) {
            camino.unshift(this.getElementAt(indiceActual).value.name);
            indiceActual = previous[indiceActual];
        }
        let dijkstra = `La distancia de ${this.getElementAt(inicio).value.name} a ${this.getElementAt(destino).value.name} es de ${distanciaFinal}. El camino es: ${camino.join(" -> ")}`;
        return dijkstra;
    }
}
