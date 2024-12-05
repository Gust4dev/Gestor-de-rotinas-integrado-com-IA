import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Layout className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">About Us</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6"
        >
          <Card className="p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-3/4">
                  <h2 className="text-2xl font-bold mb-6">Gustavo Gomes</h2>
                  <div className="space-y-4">
                    <p>
                      Olá! Sou Gustavo Gomes, desenvolvedor back-end apaixonado por transformar 
                      ideias complexas em soluções práticas e eficientes. Com experiência em Python, 
                      Node.js, MongoDB e TypeScript, meu foco está na criação de APIs robustas e 
                      seguras, otimizando sistemas para garantir desempenho e escalabilidade excepcionais.
                    </p>
                    <p>
                      Atualmente, curso Engenharia de Software na UniEvangélica, onde alio a base 
                      teórica acadêmica à prática do dia a dia. Meu trabalho é guiado pela busca 
                      constante por inovação e qualidade, sempre orientado a resultados. Um exemplo 
                      disso foi quando otimizei mais de 30 endpoints, reduzindo o tempo de resposta 
                      de consultas em 50% e fortalecendo a estabilidade do sistema.
                    </p>
                    <p>
                      Além disso, desenvolvi a aplicação PsiCare, uma plataforma para gestão de 
                      clínicas de psicologia, onde apliquei MongoDB e TypeScript para criar uma 
                      solução eficiente e segura, demonstrando minha capacidade de unir técnica 
                      com experiência do usuário.
                    </p>
                    <p>
                      Fluente em inglês, estou preparado para colaborar em ambientes multiculturais 
                      e abraçar desafios globais. Minha dedicação vai além do código: acredito em 
                      entregar resultados que superem expectativas, promovam impacto positivo e 
                      facilitem o crescimento das pessoas e empresas com quem trabalho.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/4 space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full" asChild>
                      <a 
                        href="https://github.com/Gust4dev" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Github className="h-5 w-5" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <a 
                        href="https://www.linkedin.com/in/gustadev/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Linkedin className="h-5 w-5" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}