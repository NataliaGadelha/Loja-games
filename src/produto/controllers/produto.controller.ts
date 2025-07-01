import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/produto.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByName(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findAllByName(nome);
  }

  @Get('/:id/resumo')
  @HttpCode(HttpStatus.OK)
  descricaoResumida(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.produtoService.descricaoResumida(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Patch('/:id/desconto/:percentual')
  @HttpCode(HttpStatus.OK)
  aplicarDesconto(
    @Param('id', ParseIntPipe) id: number,
    @Param('percentual', ParseIntPipe) percentual: number,
  ): Promise<Produto> {
    return this.produtoService.aplicarDesconto(id, percentual);
  }

  @Patch('/:id/indisponivel')
  @HttpCode(HttpStatus.OK)
  tornarIndisponivel(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.tornarIndisponivel(id);
  }

  @Patch('/:id/disponivel')
  @HttpCode(HttpStatus.OK)
  tornarDisponivel(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.tornarDisponivel(id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }
}
