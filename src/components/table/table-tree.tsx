"use client";

import { useState, useMemo, useCallback } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

// Tipo para los datos jerárquicos
interface TreeNode {
  id: string;
  tema: string;
  codigo: string;
  level: number;
  parentId?: string;
  children?: TreeNode[];
  isLeaf?: boolean;
  isEnabled?: boolean;
}

interface TableTreeProps {
  data: TreeNode[];
  onSelectionChange?: (selectedNodes: TreeNode[]) => void;
  className?: string;
}

interface FlatNode extends TreeNode {
  isExpanded: boolean;
  isVisible: boolean;
  hasChildren: boolean;
}

export function TableTree({ data, onSelectionChange, className }: TableTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());

  // Aplanar la estructura de árbol para renderizado
  const flattenTree = useCallback((nodes: TreeNode[], parentExpanded = true): FlatNode[] => {
    const result: FlatNode[] = [];

    for (const node of nodes) {
      const isExpanded = expandedNodes.has(node.id);
      const hasChildren = node.children && node.children.length > 0;
      const isVisible = parentExpanded;

      result.push({
        ...node,
        isExpanded,
        isVisible,
        hasChildren: !!hasChildren,
      });

      if (hasChildren && isExpanded) {
        result.push(...flattenTree(node.children!, isExpanded));
      }
    }

    return result;
  }, [expandedNodes]);

  const flatData = useMemo(() => flattenTree(data), [data, flattenTree]);

  // Manejar expansión/colapso de nodos
  const toggleExpand = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  // Manejar selección de checkboxes
  const toggleSelection = useCallback((nodeId: string, checked: boolean) => {
    setSelectedNodes(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(nodeId);
      } else {
        newSet.delete(nodeId);
      }

      // Notificar cambios
      if (onSelectionChange) {
        const selectedNodeObjects = flatData.filter(node => 
          newSet.has(node.id) && node.isLeaf
        );
        onSelectionChange(selectedNodeObjects);
      }

      return newSet;
    });
  }, [flatData, onSelectionChange]);

  // Obtener indentación basada en el nivel
  const getIndentation = (level: number) => {
    return level * 24; // 24px por nivel
  };

  return (
    <div className={cn("rounded-md border border-gray-200 overflow-hidden dark:border-stone-900", className)}>
      <div className="overflow-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="border-none">
              <th className="py-2 px-6 bg-gray-200 dark:bg-stone-900 text-stone font-bold text-sm text-left">
                Tema
              </th>
              <th className="py-2 px-6 bg-gray-200 dark:bg-stone-900 text-stone w-32 font-bold text-sm text-left">
                Código
              </th>
              <th className="py-2 px-6 bg-gray-200 dark:bg-stone-900 text-stone w-24 font-bold text-sm text-left">
                Habilitar
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {flatData.map((node, index) => {
              if (!node.isVisible) return null;

              const isEven = index % 2 === 0;
              const indentation = getIndentation(node.level);

              return (
                <tr
                  key={node.id}
                  className={cn(
                    "border-t border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-stone/10",
                    isEven ? "bg-white dark:bg-stone-950/50" : "bg-gray-50/30 dark:bg-stone-950/30"
                  )}
                >
                  {/* Tema */}
                  <td className="py-2 px-6">
                    <div 
                      className="flex items-center"
                      style={{ paddingLeft: `${indentation}px` }}
                    >
                      {/* Icono de expansión */}
                      {node.hasChildren ? (
                        <button
                          onClick={() => toggleExpand(node.id)}
                          className="mr-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-stone/10 transition-colors"
                        >
                          {node.isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-stone" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-stone" />
                          )}
                        </button>
                      ) : (
                        <div className="w-6 mr-2" /> // Spacer para alineación
                      )}

                      {/* Texto del tema */}
                      <span className={cn(
                        "text-sm",
                        node.level === 0 && "font-semibold text-stone",
                        node.level === 1 && "font-medium text-stone",
                        node.level >= 2 && "text-stone"
                      )}>
                        {node.tema}
                      </span>
                    </div>
                  </td>

                  {/* Código */}
                  <td className="py-2 px-6">
                    <span className="font-mono text-sm text-stone">
                      {node.codigo}
                    </span>
                  </td>

                  {/* Habilitar (solo en hojas/último nivel) */}
                  <td className="py-3 px-4 text-center">
                    {node.isLeaf ? (
                      <Checkbox
                        checked={selectedNodes.has(node.id)}
                        onCheckedChange={(checked) => toggleSelection(node.id, !!checked)}
                        aria-label={`Habilitar ${node.tema}`}
                        className="mx-auto border border-primary dark:border-stone-100"
                      />
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Información de selección */}
      {selectedNodes.size > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30 px-4 py-3">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div>
              {selectedNodes.size} elemento(s) habilitado(s)
            </div>
            <button
              onClick={() => setSelectedNodes(new Set())}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              Limpiar selección
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
