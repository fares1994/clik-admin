import { Dropdown, Icons, Menu, Tooltip } from '@pankod/refine-antd';
import React from 'react';
import { FcInfo } from 'react-icons/fc';
type ActionProps = {
  type?: string;
  edit?: boolean;
  recordName?: string;
  name_ar?: string;
  record?: any;
  deleteRecord?: boolean;
  role?: boolean;
  verifyAccount?: boolean;
  showApproveButton?: boolean;
  showRejectButton?: boolean;
  archived?: boolean;
  onClickApprove?: () => void;
  onClickReject?: () => void;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
  onClickRole?: () => void;
  onClickVerifyAccount?: () => void;
};
export const Actions: React.FC<ActionProps> = ({
  name_ar,
  // recordName,
  type,
  deleteRecord,
  record,
  edit,
  role,
  verifyAccount,
  showApproveButton,
  showRejectButton,
  archived,
  onClickApprove,
  onClickReject,
  onClickDelete,
  onClickEdit,
  onClickRole,
  onClickVerifyAccount,
}) => {
  const moreMenu = (record: any) => (
    <Menu
      mode="vertical"
      onClick={({ domEvent }) => domEvent.stopPropagation()}
    >
      {(type === 'approveReject' || type === 'specialty') && (
        <>
          {!showApproveButton && (
            <Menu.Item
              key="accept"
              style={{
                fontSize: 15,
                display: 'flex',
                alignItems: 'center',
                fontWeight: 500,
              }}
              icon={
                <Icons.CheckCircleOutlined
                  style={{
                    color: '#52c41a',
                    fontSize: 17,
                    fontWeight: 500,
                  }}
                />
              }
              onClick={onClickApprove}
            >
              {`اعتماد ${name_ar}`}
            </Menu.Item>
          )}
          {type !== 'specialty' && !showRejectButton && (
            <Menu.Item
              key="reject"
              style={{
                fontSize: 15,
                display: 'flex',
                alignItems: 'center',
                fontWeight: 500,
              }}
              icon={
                <Icons.CloseCircleOutlined
                  style={{
                    color: '#EE2A1E',
                    fontSize: 17,
                  }}
                />
              }
              onClick={onClickReject}
            >
              {`رفض ${name_ar}`}
            </Menu.Item>
          )}
        </>
      )}
      {verifyAccount && (
        <Menu.Item
          key="switch"
          style={{
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 500,
          }}
          onClick={onClickVerifyAccount}
          icon={
            <Icons.CheckCircleOutlined
              style={{
                color: '#52c41a',
                fontSize: 17,
                fontWeight: 500,
              }}
            />
          }
        >
          {'تفعيل الحساب'}
        </Menu.Item>
      )}
      {(type === 'delete' || deleteRecord) && (
        <Menu.Item
          key="delete"
          style={{
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 500,
          }}
          icon={
            <FcInfo
              color={'#EE2A1E'}
              size={20}
              style={{
                marginRight: 0,
                marginLeft: 8,
              }}
            />
          }
          onClick={onClickDelete}
        >
          {record?.is_deleted ? 'Retrieve' : 'Delete'}
        </Menu.Item>
      )}
      {edit && (
        <Menu.Item
          key="edit"
          style={{
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 500,
          }}
          onClick={onClickEdit}
          icon={<Icons.EditFilled style={{ fontSize: 16 }} />}
        >
          {'Edit'}
        </Menu.Item>
      )}
      {role && (
        <Menu.Item
          key="role"
          style={{
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 500,
          }}
          onClick={onClickRole}
          icon={<Icons.EditFilled style={{ fontSize: 16 }} />}
        >
          {'تعديل الدور'}
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <Tooltip
      placement="top"
      title={<p style={{ marginBottom: -1 }}>{'More'}</p>}
      style={{ maxWidth: 20 }}
    >
      <Dropdown overlay={moreMenu(record)} trigger={['click']}>
        {type === 'specialty' ? (
          <button
            style={{
              color: 'rgb(82, 146, 202)',
              fontWeight: 'bold',
            }}
            onClick={(e) => e.stopPropagation()}
            className="transparent-button"
          >
            مراجعة
          </button>
        ) : (
          <Icons.MoreOutlined
            style={{ fontSize: 27 }}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </Dropdown>
    </Tooltip>
  );
};