import { CategoriaService } from './../../categoria/services/categoria.service';
import { Produto } from '../entities/produto.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findAllByName(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  async aplicarDesconto(id: number, percentual: number): Promise<Produto> {
    const produto = await this.findById(id);

    if (percentual < 0 || percentual > 100) {
      throw new HttpException(
        'Percentual de desconto inválido',
        HttpStatus.BAD_REQUEST,
      );
    }

    produto.preco = parseFloat(
      (produto.preco * (1 - percentual / 100)).toFixed(2),
    );
    return await this.produtoRepository.save(produto);
  }

  async tornarIndisponivel(id: number): Promise<Produto> {
    const produto = await this.findById(id);
    produto.disponivel = false;
    return await this.produtoRepository.save(produto);
  }

  async tornarDisponivel(id: number): Promise<Produto> {
    const produto = await this.findById(id);
    produto.disponivel = true;
    return await this.produtoRepository.save(produto);
  }

  async descricaoResumida(id: number): Promise<string> {
    const produto = await this.findById(id);
    return `${produto.nome} - ${produto.plataforma} - ${produto.genero}`;
  }

  async create(produto: Produto): Promise<Produto> {
    await this.categoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    await this.categoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}
