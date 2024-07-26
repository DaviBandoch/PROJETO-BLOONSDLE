using System;

class Program {
  public static void Main (string[] args) {
   
    Console.WriteLine("Choose an option:");
    Console.WriteLine("1. Programa Hello World!");
    Console.WriteLine("2. Programa de calculadora");
    Console.WriteLine("3. Sair");

    int choice = int.Parse(Console.ReadLine());

    switch (choice)
    {
        case 1:
                Console.WriteLine (" ⣿⣿⣿⣿⣿⡏⠉⠄⠄⠄⠄⠄⠄⠄⠄⠈⠉⠉⠉⠉⠉⠉⠉⢿⣿⣿⣿⣿⣿⣿\n ⣿⣿⣿⣿⣿⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠸⣿⣿⣿⣿⣿⣿\n ⣿⣿⣿⣿⣿⠄⠄⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿\n ⣿⣿⣿⣿⣿⠄⢠⡏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿\n ⣍⡉⠙⠛⠛⠄⠾⢀⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⠛⠛⠛⠛⣛\n ⣿⣿⣶⣦⣄⢀⣀⡀⠄⠉⠉⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⡀⠄⣤⣤⣶⣶⣾⣿\n ⣿⣿⣿⣿⠛⠸⣿⣿⣿⣿⣟⣿⣿⣿⣿⣿⣟⣻⣾⣿⣿⣿⡅⠄⢻⢿⣿⣿⣿⣿\n ⣿⣿⣿⣧⡃⠄⢀⠤⠄⠄⠄⠄⠄⢀⡀⠄⢠⡤⠄⠄⠄⠄⠄⠄⡇⢠⣿⣿⣿⣿\n ⣿⣿⣿⣿⡇⠄⢹⠄⠄⠄⠄⠄⠄⢸⣿⠄⠘⠄⠄⠄⠄⠄⠄⢸⢀⣿⣿⣿⣿⣿\n ⣿⣿⣿⣿⡝⡇⢄⣀⣀⣀⣀⣠⣴⣸⣿⠄⠈⢀⠄⢀⣀⡀⠄⢨⣾⣿⣿⣿⣿⣿\n ⣿⣿⣿⣿⣿⣅⠸⣿⣿⣿⣿⣹⡿⠿⡿⠇⠋⡻⣿⣿⠟⠄⠄⣦⣿⣿⣿⣿⣿⣿\n ⣿⣿⣿⣿⣿⣿⠄⣿⡽⣿⠗⠋⠉⠁⠈⠄⠉⠘⠛⣿⢠⠄⠄⣿⣿⣿⣿⣿⣿⣿\n ⣿⣿⣿⣿⣿⣿⣧⡘⣿⠏⠄⣠⣤⣄⣠⣤⣀⣠⣄⠻⢸⠃⣼⣿⣿⣿⣿⣿⣿⣿\n ⣿⣿⣿⣿⣿⣿⣿⣷⣸⠄⢐⢿⡏⠁⠄⠈⢹⠿⠟⢀⣾⣾⣿⣿⣿⣿⣿⣿⣿⣿\n ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠃⠈⠁⠄⠄⠄⠈⠄⠄⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n");

            Console.WriteLine(" ##   ##  #######  ##       ##       #######\n ##   ##           ##       ##            ## \n #######  ####     ##       ##       ##   ##\n ##   ##  ##       ##   ##  ##   ##  ##   ##\n ##   ##  #######  #######  #######  #######");

            Console.WriteLine("\n ##   ##  #######  #######  ##       ######\n ## # ##       ##       ##  ##            ##\n #######  ##   ##  #######  ##       ##   ##\n ### ###  ##   ##  ##  ##   ##   ##  ##   ##\n ##   ##  #######  ##   ##  #######  ######");
            break;

      
        case 2:
      
            Console.WriteLine("Digite o primeiro número: ");
            double num1 = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("Digite o segundo número: ");
            double num2 = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("Digite a operação desejada: ");
            Console.WriteLine("1. Soma");
            Console.WriteLine("2. Subtração");
            Console.WriteLine("3. Multiplicação");
            Console.WriteLine("4. Divisão");

            int escolha = Convert.ToInt32(Console.ReadLine());

            double result = 0;




            switch (escolha)
            {
                case 1:
                    result = num1 + num2;
                    break;
                case 2:
                    result = num1 - num2;
                    break;
                case 3:
                    result = num1 * num2;
                    break;
                case 4: 
                    result = num1 / num2;
                    break;
            }


            if (escolha < 4 | escolha < 0 ) {
                 Console.WriteLine("Resultado: " + result);

            }
            else{
                Console.WriteLine("Operação inválida");
            }


            break;
        case 3:
            Console.WriteLine("Saindo...");
            break;
        default:
            Console.WriteLine("Escolha inválida.");
            break;
    }
  }
}
