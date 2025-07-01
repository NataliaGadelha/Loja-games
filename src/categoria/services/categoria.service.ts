import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: {
        produtos: true,
      },
    });
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: {
        id,
      },
      relations: {
        produtos: true,
      },
    });

    if (!categoria)
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );

    return categoria;
  }

  async findAllByDescricao(descricao: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        produtos: true,
      },
    });
  }

  async findAllByNome(nome: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: { produtos: true },
    });
  }

  async updateDescricao(id: number, novaDescricao: string): Promise<Categoria> {
    const categoria = await this.findById(id);

    if (!novaDescricao || novaDescricao.trim() === '') {
      throw new HttpException(
        'Descrição não pode ser vazia!',
        HttpStatus.BAD_REQUEST,
      );
    }

    categoria.descricao = novaDescricao.trim();
    return await this.categoriaRepository.save(categoria);
  }

  async contarProdutosPorCategoria(id: number): Promise<number> {
    const categoria = await this.findById(id);
    return categoria.produtos?.length || 0;
  }

  async create(Categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(Categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);
    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.categoriaRepository.delete(id);
  }
}
