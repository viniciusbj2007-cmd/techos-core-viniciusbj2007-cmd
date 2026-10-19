// Classe Base (Abstrata simulada) Usuario
class Usuario {
    constructor(id, nome, email) {
        if (this.constructor === Usuario) {
            throw new Error("Não é possível instanciar a classe abstrata Usuario diretamente.");
        }
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    getId() { return this.id; }
    getNome() { return this.nome; }
    getEmail() { return this.email; }
}

// Subclass Cliente
class Cliente extends Usuario {
    constructor(id, nome, email, telefone) {
        super(id, nome, email);
        this.telefone = telefone;
    }

    getTelefone() { return this.telefone; }
}

// Subclass Tecnico
class Tecnico extends Usuario {
    constructor(id, nome, email, especialidade) {
        super(id, nome, email);
        this.especialidade = especialidade;
    }

    getEspecialidade() { return this.especialidade; }
}

// Classe de Domínio OrdemServico
class OrdemServico {
    constructor(id, cliente, status = 'ABERTA') {
        this.id = id;
        this.cliente = cliente;
        this.status = status;
    }

    toArray() {
        return {
            id: this.id,
            cliente: this.cliente.getNome(),
            status: this.status
        };
    }
}

// Padrão Factory Method: UsuarioFactory
class UsuarioFactory {
    static criarUsuario(tipo, id, nome, email, extra) {
        if (tipo === 'cliente') {
            console.log(`[FACTORY] Criando Usuário Tipo: CLIENTE... -> Objeto 'Cliente' criado (ID: ${id}, Nome: ${nome}).`);
            return new Cliente(id, nome, email, extra);
        } else if (tipo === 'tecnico') {
            console.log(`[FACTORY] Criando Usuário Tipo: TECNICO... -> Objeto 'Tecnico' criado (ID: ${id}, Nome: ${nome}).`);
            return new Tecnico(id, nome, email, extra);
        }
        throw new Error("Tipo de usuário inválido.");
    }
}

// Padrão Singleton: GerenciadorOS
class GerenciadorOS {
    constructor() {
        if (GerenciadorOS.instancia) {
            return GerenciadorOS.instancia;
        }
        console.log("[SINGLETON] Instância única do GerenciadorOS inicializada.");
        this.ordensServico = [];
        GerenciadorOS.instancia = this;
    }

    static getInstancia() {
        if (!GerenciadorOS.instancia) {
            new GerenciadorOS();
        }
        return GerenciadorOS.instancia;
    }

    registrarOS(os) {
        this.ordensServico.push(os);
        console.log(`[SISTEMA] Ordem de Serviço #${os.toArray().id} registrada com sucesso!`);
    }

    listarOS() {
        console.log("[SISTEMA] Lista de OS ativas:");
        console.log(this.ordensServico.map(os => os.toArray()));
    }
}

// --- Execução da Aplicação ---
const gerenciador = GerenciadorOS.getInstancia();

const clienteAna = UsuarioFactory.criarUsuario('cliente', 101, 'Ana', 'ana@email.com', '11999999999');
const tecnicoCarlos = UsuarioFactory.criarUsuario('tecnico', 202, 'Carlos', 'carlos@email.com', 'Redes');

const os1 = new OrdemServico(1, clienteAna, 'ABERTA');
gerenciador.registrarOS(os1);

gerenciador.listarOS();