import React, { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  FileCode2, 
  FileText, 
  FileJson, 
  FilePlus, 
  FolderPlus, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Trash2,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
  FolderTree,
  Eye,
  EyeOff
} from 'lucide-react';
import { FileItem } from '../types';

interface WorkspaceExplorerProps {
  files: FileItem[];
  activeFileId: string | null;
  onSelectFile: (fileId: string) => void;
  onCreateFile: (name: string, isFolder: boolean) => void;
  onDeleteFile: (fileId: string) => void;
  onAskAIToModify: (file: FileItem) => void;
}

export const WorkspaceExplorer: React.FC<WorkspaceExplorerProps> = ({
  files,
  activeFileId,
  onSelectFile,
  onCreateFile,
  onDeleteFile,
  onAskAIToModify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState<'file' | 'folder' | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'root-src': true,
  });

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const collapseAllFolders = () => {
    setExpandedFolders({});
  };

  const expandAllFolders = () => {
    const allFolderIds: Record<string, boolean> = {};
    files.filter(f => f.type === 'folder').forEach(f => {
      allFolderIds[f.id] = true;
    });
    setExpandedFolders(allFolderIds);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    onCreateFile(newItemName.trim(), isCreating === 'folder');
    setNewItemName('');
    setIsCreating(null);
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (fileName: string, type: 'file' | 'folder', isOpen?: boolean) => {
    if (type === 'folder') {
      return isOpen ? <FolderOpen className="w-3.5 h-3.5 text-[#22C55E]" /> : <Folder className="w-3.5 h-3.5 text-emerald-500" />;
    }
    if (fileName.endsWith('.tsx') || fileName.endsWith('.ts')) {
      return <FileCode2 className="w-3.5 h-3.5 text-sky-400" />;
    }
    if (fileName.endsWith('.json')) {
      return <FileJson className="w-3.5 h-3.5 text-amber-400" />;
    }
    if (fileName.endsWith('.css')) {
      return <FileCode2 className="w-3.5 h-3.5 text-pink-400" />;
    }
    return <FileText className="w-3.5 h-3.5 text-[#888]" />;
  };

  const renderFileTree = (parentId: string | null = null, depth = 0) => {
    const items = files.filter(f => f.parentId === parentId);

    return items.map((item) => {
      if (item.type === 'folder') {
        const isExpanded = Boolean(expandedFolders[item.id]);
        return (
          <div key={item.id} className="select-none">
            <div
              onClick={() => toggleFolder(item.id)}
              style={{ paddingLeft: `${depth * 10 + 6}px` }}
              title={isExpanded ? "Click to collapse folder" : "Click to expand folder"}
              className="flex items-center justify-between py-0.5 px-1.5 text-[11px] hover:bg-[#1A1A1A] rounded cursor-pointer text-[#D1D1D1] hover:text-white transition group"
            >
              <div className="flex items-center space-x-1 truncate">
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3 text-[#888]" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-[#666]" />
                )}
                {getFileIcon(item.name, 'folder', isExpanded)}
                <span className="font-mono text-white">{item.name}</span>
              </div>
              <span className="text-[9px] font-mono text-[#555] opacity-0 group-hover:opacity-100 transition-opacity">
                {isExpanded ? 'Fold' : 'Unfold'}
              </span>
            </div>

            {isExpanded && renderFileTree(item.id, depth + 1)}
          </div>
        );
      }

      const isSelected = activeFileId === item.id;

      return (
        <div
          key={item.id}
          style={{ paddingLeft: `${depth * 10 + 16}px` }}
          onClick={() => onSelectFile(item.id)}
          title={isSelected ? "Click again to close/hide file" : "Click to view file"}
          className={`group flex items-center justify-between py-0.5 px-1.5 text-[11px] rounded cursor-pointer transition ${
            isSelected
              ? 'bg-blue-600/20 text-blue-300 font-mono font-medium border border-blue-500/30 shadow-xs'
              : 'text-[#AAA] hover:text-white hover:bg-[#1A1A1A] border border-transparent'
          }`}
        >
          <div className="flex items-center space-x-1.5 truncate">
            {getFileIcon(item.name, 'file')}
            <span className="truncate font-mono">{item.name}</span>
          </div>

          <div className="flex items-center space-x-1">
            {isSelected ? (
              <span className="text-[9px] font-mono text-blue-400 flex items-center gap-0.5" title="Active (Click again to hide/close)">
                <Eye className="w-3 h-3 text-blue-400" />
              </span>
            ) : (
              <span className="hidden group-hover:inline text-[9px] font-mono text-[#666]">
                <EyeOff className="w-3 h-3 opacity-60" />
              </span>
            )}

            <div className="hidden group-hover:flex items-center space-x-0.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAskAIToModify(item);
                }}
                title="Ask Agent to Edit"
                className="p-0.5 hover:bg-blue-500/20 text-blue-400 rounded transition"
              >
                <Sparkles className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFile(item.id);
                }}
                title="Delete File"
                className="p-0.5 hover:bg-rose-500/20 text-rose-400 rounded transition"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  // Render Slim Collapsed Sidebar if panel is hidden
  if (isPanelCollapsed) {
    return (
      <div className="w-10 bg-[#0F0F0F] border-r border-[#2A2A2A] flex flex-col items-center py-2 h-full text-xs font-sans select-none z-10 space-y-2">
        <button
          onClick={() => setIsPanelCollapsed(false)}
          title="Expand Explorer Panel"
          className="p-1.5 text-[#888] hover:text-white hover:bg-[#1A1A1A] rounded transition"
        >
          <PanelLeft className="w-4 h-4 text-blue-400" />
        </button>
        <div className="w-6 h-px bg-[#2A2A2A]" />
        {files.filter(f => f.type === 'file').slice(0, 6).map((file) => (
          <button
            key={file.id}
            onClick={() => {
              setIsPanelCollapsed(false);
              onSelectFile(file.id);
            }}
            title={`Open ${file.name}`}
            className={`p-1.5 rounded transition ${
              activeFileId === file.id ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-[#888] hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            {getFileIcon(file.name, 'file')}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full md:w-56 flex-shrink-0 bg-[#0F0F0F] border-r border-[#2A2A2A] flex flex-col h-full text-xs font-sans select-none z-10 transition-all duration-200 overflow-hidden">
      {/* Workspace Header */}
      <div className="p-2 border-b border-[#2A2A2A] flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span className="font-mono font-semibold text-[#666] tracking-wider uppercase text-[10px]">
            Explorer
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={collapseAllFolders}
            title="Collapse All Folders"
            className="p-1 text-[#888] hover:text-white hover:bg-[#1A1A1A] rounded transition"
          >
            <FolderTree className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsCreating('file')}
            title="New File"
            className="p-1 text-[#888] hover:text-[#22C55E] hover:bg-[#1A1A1A] rounded transition"
          >
            <FilePlus className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsCreating('folder')}
            title="New Folder"
            className="p-1 text-[#888] hover:text-[#22C55E] hover:bg-[#1A1A1A] rounded transition"
          >
            <FolderPlus className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsPanelCollapsed(true)}
            title="Hide Explorer Panel"
            className="p-1 text-[#888] hover:text-amber-400 hover:bg-[#1A1A1A] rounded transition"
          >
            <PanelLeftClose className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* File Search */}
      <div className="p-1.5 border-b border-[#2A2A2A]">
        <div className="relative">
          <Search className="w-3 h-3 text-[#666] absolute left-2 top-1.5" />
          <input
            type="text"
            placeholder="Filter files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#151515] border border-[#2A2A2A] rounded pl-6 pr-1.5 py-0.5 text-[11px] text-[#D1D1D1] placeholder-[#555] focus:outline-none focus:border-blue-500/50 font-mono"
          />
        </div>
      </div>

      {/* Create New Item Form */}
      {isCreating && (
        <form onSubmit={handleCreateSubmit} className="p-1.5 bg-[#151515] border-b border-[#2A2A2A] flex items-center space-x-1">
          <input
            type="text"
            autoFocus
            placeholder={`New ${isCreating}...`}
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-1 bg-[#0D0D0D] border border-blue-500/40 rounded px-1.5 py-0.5 text-[11px] text-white focus:outline-none font-mono"
          />
          <button type="submit" className="px-1.5 py-0.5 bg-blue-600 text-white rounded text-[9px] font-mono font-medium">
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsCreating(null)}
            className="px-1 py-0.5 text-[#888] hover:text-white text-[9px] font-mono"
          >
            Cancel
          </button>
        </form>
      )}

      {/* File List Tree */}
      <div className="flex-1 overflow-y-auto p-1 space-y-0.5">
        {searchQuery ? (
          filteredFiles.map((file) => (
            <div
              key={file.id}
              onClick={() => onSelectFile(file.id)}
              className={`p-1 rounded flex items-center space-x-1.5 cursor-pointer text-[11px] font-mono ${
                activeFileId === file.id ? 'bg-blue-600/20 text-blue-300 font-medium' : 'text-[#AAA] hover:bg-[#1A1A1A]'
              }`}
            >
              {getFileIcon(file.name, file.type)}
              <span className="truncate">{file.path}</span>
            </div>
          ))
        ) : (
          renderFileTree(null)
        )}
      </div>
    </div>
  );
};
