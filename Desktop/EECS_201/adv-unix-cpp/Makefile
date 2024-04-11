CXX = g++
CXXFLAGS = -std=c++17 -g
BIN = mush

SRCS = $(shell find . -name "*.cpp")

all: $(BIN)

clean:
	rm -f $(BIN)

$(BIN): $(SRCS)
	$(CXX) -o $@ $(CXXFLAGS) $^
