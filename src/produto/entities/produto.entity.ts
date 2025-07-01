import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity('tb_produto')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  codigo: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  genero: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  plataforma: string;

  @IsNotEmpty()
  @Column('decimal', { precision: 8, scale: 2, nullable: false })
  preco: number;

  @Column({ default: true, nullable: false })
  disponivel: boolean;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}
