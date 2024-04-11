#include <iostream>
#include <string>
#include <vector>
#include <unistd.h>
#include <sys/wait.h>
#include <cstdlib>
#include <cstring>

void split(const std::string &s, std::vector<std::string> &tokens) {
    size_t start = 0;
    size_t end = s.find(' ');
    while (end != std::string::npos) {
        tokens.push_back(s.substr(start, end - start));
        start = end + 1;
        end = s.find(' ', start);
    }
    tokens.push_back(s.substr(start));
}

int main() {
    std::string input;
    std::vector<std::string> tokens;

    while (true) {
        // Print prompt
        char cwd[256];
        if (getcwd(cwd, sizeof(cwd)) == nullptr) {
            perror("getcwd failed");
            return 1;
        }
        std::cout << getenv("USER") << ":" << cwd << "$ ";

        // Receive user input
        std::getline(std::cin, input);
        if (std::cin.eof()) {
            std::cout << std::endl;
            return 0;  // Exit on EOF
        }

        if (input.empty()) continue;  // Handle empty input

        // Tokenize input
        tokens.clear();
        split(input, tokens);
        if (tokens.empty()) continue;

        // Handle 'exit'
        if (tokens[0] == "exit") {
            int exit_status = 0;
            if (tokens.size() > 1) {
                exit_status = std::stoi(tokens[1]);
            }
            return exit_status;
        }

        // Handle 'cd'
        if (tokens[0] == "cd") {
            std::string dir = (tokens.size() > 1) ? tokens[1] : getenv("HOME");
            if (chdir(dir.c_str()) != 0) {
                perror(("mush: cd: no such file or directory '" + dir + "'").c_str());
            }
            continue;
        }

        // Handle non-builtins
        pid_t pid = fork();
        if (pid == 0) {  // Child process
            std::vector<char*> args;
            for (auto &arg : tokens) {
                args.push_back(const_cast<char*>(arg.c_str()));
            }
            args.push_back(nullptr);

            execvp(args[0], args.data());
            perror(("mush: command '" + tokens[0] + "' not found").c_str());
            exit(EXIT_FAILURE);
        } else if (pid > 0) {  // Parent process
            int status;
            waitpid(pid, &status, 0);
        } else {
            perror("fork failed");
            return 1;
        }
    }

    return 0;
}