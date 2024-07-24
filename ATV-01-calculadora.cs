using System;


    class Program
    {



        
            static void Main(string[] args)
            {





                
                Console.WriteLine("Digite o primeiro número:");
                double num1 = Convert.ToDouble(Console.ReadLine());

                Console.WriteLine("Digite o segundo número:");
                double num2 = Convert.ToDouble(Console.ReadLine());

                Console.WriteLine("Choose an operation:");
                Console.WriteLine("1. Soma");
                Console.WriteLine("2. Subtração");
                Console.WriteLine("3. Multiplicação");
                Console.WriteLine("4. Divisão");

                int choice = Convert.ToInt32(Console.ReadLine());

                double result = 0;



                
                switch (choice)
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
                    case <4:
                        Console.WriteLine("Escolha uma opção válida");
                        break;
                }




        
            }







    
        }